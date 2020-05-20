import React from 'react';
import {connect} from 'react-redux';
import Question from '../../components/Question'

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';
import axios from 'axios'
import {Div, Panel, Alert, Group, Button, PanelHeader} from "@vkontakte/vkui"

const API_URL = "https://server.abbysoft.org:433"

class HomePanelBase extends React.Component {

    nextButton = null;

    state = {
        showImg: false,
        questions: [],
        currentQuestionIndex: 0,
        questionCount: 10,
        correctAnswers: 0,
        currentState: "menu",
        time: 10,
        answered: false,
    };

    testIsOver() {
        this.setState({currentState: "testOver"})
    }

    showImg = () => {
        this.setState({showImg: true});
    };

    openPopout() {
        this.props.openPopout(
            <Alert
                actions={[{
                    title: 'Нет',
                    autoclose: true,
                    style: 'cancel',
                }, {
                    title: 'Да',
                    autoclose: true,
                    action: this.showImg
                }]}
                onClose={() => this.props.closePopout()}
            >
                <h2>Вопрос значит</h2>
                <p>Вас роняли в детстве?</p>
            </Alert>
        );
    }

    onAnswerResult(isCorrect) {
        if (isCorrect) {
            this.setState({
                correctAnswers: ++this.state.correctAnswers,
                answered: true
            })
        } else {
            this.setState({
                answered: true
            })
        }

        this.nextButton.scrollIntoView({behavior: "smooth"})
    }

    showNextQuestion() {
        if (this.state.currentQuestionIndex + 1 > this.state.questions.length) {
            this.setState({
                currentState: "testOver",
                answered: false
            })
        } else {
            this.setState({
                currentQuestionIndex: this.state.currentQuestionIndex + 1,
                answered: false
            })
        }
    }

    getCurrentContent(state) {
        console.log(this.state.question)
        switch (state) {
            case "menu":
                return this.getMenuContent()
            case "performingTest":
                if (this.state.questions.length == 0) {
                    return this.getLoadingContent()
                } else {
                    return this.getQuestionComponent()
                }
            case "testOver":
                return this.getSummaryContent()
        }
    }

    render() {
        const {id, setPage, withoutEpic} = this.props
        const content = this.getCurrentContent(this.state.currentState)

        return (
            <Panel id={id}>
                <PanelHeader>LearnIT <small className="beta">beta</small></PanelHeader>
                <Group>
                    <Div alignY="center">
                        {content}
                    </Div>
                </Group>
            </Panel>
        );
    }

    getMenuContent() {
        return (
            <div className="panel panel_list">
                <h1 className="panel_title">Уровень тестирования</h1>
                <div className="menu_item" onClick={() => this.startTest("junior")}>Начинающий (Junior)</div>
                <div className="menu_item" onClick={() => this.startTest("middle")}>Средний (Middle)</div>
                <div className="menu_item" onClick={() => this.startTest("senior")}>Продвинутый (Senior)</div>
            </div>
        )
    }

    startTest(level) {        
        this.setState({
            currentState: "performingTest",
            currentQuestionIndex: 1,
            questions: [],
            level: level,
            correctAnswers: 0
        })

        this.loadRandomQuestions(level)
    }

    loadRandomQuestions(level) {
        axios.get(API_URL + "/question/random?level=" + level + "&" + "count=20").then(res => this.setState({
            questions: res.data,
            questionCount: res.data.length,
        }))
    }

    getSummaryContent() {
        const correctPercentage = Math.round((this.state.correctAnswers * 1.0 / this.state.questions.length * 1.0) * 100);
        return (
            <div>
                <div className="panel_lighter panel poll_card" style={{marginBottom: "10px"}}>
                    <p>Следите за новостями в группе VK</p>
                    <div className="center-vertically">
                        <a style={{marginRight: "10px"}} href="https://vk.com/javatests">Перейти в группу</a>
                        <img width="50" src="https://leonardo.osnova.io/7e0ec5a0-1e56-2e90-de73-6c402276900d/-/resize/900"></img>
                    </div>
                </div>
                <div className="panel_lighter panel">
                    <h1>Тест завершен</h1>
                    <p>Результат: {correctPercentage} %</p>
                    <p>Количество верных ответов: {this.state.correctAnswers}</p>
                </div>
                <div className="panel_lighter panel poll_card" style={{display: this.state.hidePoll ? 'none' : 'block' }}>
                        <div>
                            <p>Что можно было бы улучшить в приложении?</p>
                            <table className="answer_container">
                                {this.renderPollOption(0, "Больше вопросов")}
                                {this.renderPollOption(1, "Результат по областям Java")}
                                {this.renderPollOption(2, "Тестовые задания с оценкой")}
                                <td className="answer_card dark" style={{display: this.state.customPollAnswer ? 'none' : 'block' }} onClick={() => this.customPollAnswer()}>Другое</td>
                                <div className="custom_answer" style={{display: this.state.customPollAnswer ? 'block' : 'none' }}>
                                    <input type="text" classname="textField"
                                    placeholder="Отзывы и пожелания" onChange={(event) => this.setState({customPollAnswer: event.target.value})}/>
                                    <div className="button button_field" onClick={() => this.customPollAnswerReceived()}>Отправить</div>
                                </div>
                            </table>
                        </div>
                </div>
                <div className="button" onClick={() => this.setState({currentState: "menu"})}>Пройти снова</div>
            </div>
        )
    }

    renderPollOption(index, text) {
        var style = {
        display: this.state.customPollAnswer ? 'none' : 'block'}

        if (this.state.pollAnswer == index) {
            style = {
                display: this.state.customPollAnswer ? 'none' : 'block',
                "background-color": this.state.pollAnswer == index ? "#d9ec8d" : "rgb(243, 234, 196)"} 
        }

        return (
            <td className="answer_card dark" style={style} onClick={() => this.onPollAnswered(index)}>{text}</td>
        );
    }

    customPollAnswerReceived() {
        this.onPollAnswered(this.state.customPollAnswer)
        this.setState({pollAnswered: true, hidePoll: true})
        alert("Спасибо, Вы нам очень помогли!")
    }

    // extract API CALLS to a class
    onPollAnswered(answer) {
        console.log("poll answer " + answer)
        this.setState({pollAnswer: answer})
        axios.post(API_URL + "/question/answer?question=" + 1000 + "&" + "answer=" + answer).catch((error) => console.error(error))
    }

    customPollAnswer() {
        this.setState({customPollAnswer: true})
    }

    getQuestionComponent() {
        return (
            <div>
                <div>
                    <div className="current_question">
                        <div className="time_circle">{this.state.time}</div>
                        <a className="center question_num">{this.state.currentQuestionIndex} из {this.state.questionCount}</a>
                    </div>
                </div>
                <Question question={this.state.questions[this.state.currentQuestionIndex - 1]} onAnswerResult={(answer) => this.onAnswerResult(answer)}></Question>
                <div className="button" style={{display: this.state.answered ? 'block' : 'none' }}
                 ref={(button) => this.nextButton = button}
                 onClick={() => this.showNextQuestion()}>Следующий</div>
            </div>
        );
     }

    getLoadingContent() {
        return <div className="loadingContainer"><h1>Loading</h1></div>
    }

}

const mapDispatchToProps = {
    setPage,
    goBack,
    openPopout,
    closePopout,
    openModal
};

export default connect(null, mapDispatchToProps)(HomePanelBase);

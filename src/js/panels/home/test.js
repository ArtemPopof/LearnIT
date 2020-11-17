import React from 'react';
import Question from '../../components/Question'

import axios from 'axios'
import {Div, Panel, Alert, Group, Button, PanelHeader} from "@vkontakte/vkui"

const API_URL = "https://server.abbysoft.org:433"

export default class Test extends React.Component {

    nextButton = null;

    componentDidMount() {
        this.startTest(this.props.level)
    }

    state = {
        showImg: false,
        questions: [],
        currentQuestionIndex: 0,
        questionCount: 10,
        correctAnswers: 0,
        currentState: "performingTest",
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
        console.log("questions: " + this.state.questions)
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

        return(
            <div className="contrast_block" style={{display: 'flex', justifyContent: 'center', backgroundColor: "rgb(55, 55, 122)"}}>
                {content}
            </div>
        )
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
        console.log("load questions " + level)
        axios.get(API_URL + "/question/random?level=" + level + "&" + "count=20").then(res => this.setState({
            questions: res.data,
            questionCount: res.data.length,
        }))
    }

    getSummaryContent() {
        const correctPercentage = Math.round((this.state.correctAnswers * 1.0 / this.state.questions.length * 1.0) * 100);
        return (
            <div style={{marginTop: "20px", backgroundColor: "rgb(55, 55, 122)"}}>
                <div className="panel" style={{marginBottom: "10px"}}>
                    <h2>Следите за новостями в группе VK</h2>
                    <div className="center-vertically">
                        <a style={{marginRight: "10px"}} href="https://vk.com/javatests">Перейти в группу</a>
                        <img width="50" src="https://leonardo.osnova.io/7e0ec5a0-1e56-2e90-de73-6c402276900d/-/resize/900"></img>
                    </div>
                </div>
                <div className="panel" style={{marginBottom: "10px"}}>
                    <h1>Тест завершен</h1>
                    <p>Результат: {correctPercentage} %</p>
                    <p>Количество верных ответов: {this.state.correctAnswers}</p>
                </div>
                <div className="panel" style={{display: this.state.hidePoll ? 'none' : 'block', marginBottom: "10px"}}>
                        <div>
                            <h2>Что можно было бы улучшить в приложении?</h2>
                            <table className="answer_container" style={{flexWrap: "wrap", justifyContent: "center"}}>
                                {this.renderPollOption(0, "Больше вопросов")}
                                {this.renderPollOption(1, "Результат по областям Java")}
                                {this.renderPollOption(2, "Тестовые задания с оценкой")}
                                <td className="poll_option" style={{display: this.state.customPollAnswer ? 'none' : 'inherit' }} onClick={() => this.customPollAnswer()}>Другое</td>
                                <div className="custom_answer" style={{display: this.state.customPollAnswer ? 'block' : 'none' }}>
                                    <input type="text" classname="textField"
                                    placeholder="Отзывы и пожелания" onChange={(event) => this.setState({customPollAnswer: event.target.value + " "})}/>
                                    <div className="button button_field" onClick={() => this.customPollAnswerReceived()}>Отправить</div>
                                </div>
                            </table>
                        </div>
                </div>
                <div className="button" onClick={() => this.openHomepage()}>Пройти снова</div>
            </div>
        )
    }

    openHomepage() {
        window.location.href = "/learnit"
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
            <td className="poll_option" style={style} onClick={() => this.onPollAnswered(index)}>{text}</td>
        );
    }

    customPollAnswerReceived() {
        console.log("custom: " + this.state.customPollAnswer)
        if (this.state.customPollAnswer == "") {
            return
        }
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
            <div style={{backgroundColor: "rgb(55, 55, 122)"}}>
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
        return <div className="loadingContainer" style={{color: "white", fontWeight: "300"}}><h1>Loading</h1></div>
    }

}

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
        axios.get(API_URL + "/question/random?level=" + level + "&" + "count=10").then(res => this.setState({
            questions: res.data,
            questionCount: res.data.length,
        }))
    }

    getSummaryContent() {
        const correctPercentage = Math.round((this.state.correctAnswers * 1.0 / this.state.questions.length * 1.0) * 100);
        return (
            <div>
                <div className="panel_lighter panel">
                    <h1>Тест завершен</h1>
                    <p>Результат: {correctPercentage} %</p>
                    <p>Количество верных ответов: {this.state.correctAnswers}</p>
                    <br/>
                    <p>Отличная работа!</p>
                </div>
                <div className="button" onClick={() => this.setState({currentState: "menu"})}>Пройти снова</div>
            </div>
        )
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

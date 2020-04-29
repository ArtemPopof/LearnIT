import React from 'react';
import {connect} from 'react-redux';
import Question from '../../components/Question'

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';
import axios from 'axios'
import {Div, Panel, Alert, Group, Button, PanelHeader} from "@vkontakte/vkui"

const API_URL = "http://localhost:8081"

class HomePanelBase extends React.Component {

    state = {
        showImg: false,
        questions: [],
        currentQuestionIndex: 0,
        questionCount: 10,
        correctAnswers: 0,
        currentState: "menu"
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
            alert("Nice Job!")
            this.setState({
                correctAnswers: ++this.state.correctAnswers
            })
        } else {
            alert("Oh shit, wrong!")
        }

        if (this.state.currentQuestionIndex + 1 > this.state.questions.length) {
            this.setState({
                currentState: "testOver"
            })
        } else {
            this.setState({
                currentQuestionIndex: this.state.currentQuestionIndex + 1
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
                    <Div className="quiz_container">
                        {content}
                    </Div>
                </Group>
            </Panel>
        );
    }

    getMenuContent() {
        return (
            <div className="menu_container">
                <h1 className="menu_title">Уровень тестирования</h1>
                <div className="menu_item" onClick={() => this.startTest("junior")}>Начинающий (Juniour)</div>
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
        const correctPercentage = Math.round((this.state.correctAnswers * 1.0 / this.state.questionCount * 1.0) * 100);
        return (
            <div className="test_summary_container">
                <h1>Тест завершен</h1>
                <p>Результат: {correctPercentage} %</p>
                <p>Количество верных ответов: {this.state.correctAnswers}</p>
                <br/>
                <p>Отличная работа!</p>
            </div>
        )
    }

    getQuestionComponent() {
        console.log(this.state)
        return (
            <div>
                <div className="current_question"><a>{this.state.currentQuestionIndex} из {this.state.questionCount}</a></div>
                <Question question={this.state.questions[this.state.currentQuestionIndex - 1]} onAnswerResult={(answer) => this.onAnswerResult(answer)}></Question>
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

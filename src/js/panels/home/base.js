import React from 'react';
import {connect} from 'react-redux';
import Question from '../../components/Question'

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';
import axios from 'axios'
import {Div, Panel, Alert, Group, Button, PanelHeader} from "@vkontakte/vkui"

const API_URL = "http://localhost:8080"

class HomePanelBase extends React.Component {

    state = {
        showImg: false,
        question: [],
        currentQuestionIndex: 0,
        questionCount: 10,
        correctAnswers: 0
    };

    componentDidMount() {
        this.loadRandomWord()
    }

    loadRandomWord() {
        if (this.state.currentQuestionIndex == this.state.questionCount) {
            this.testIsOver()
            return
        }

        axios.get(API_URL + "/question/random").then(res => this.setState({
            question: res.data,
            currentQuestionIndex: ++this.state.currentQuestionIndex
        }))
    }

    testIsOver() {
        this.setState({testIsOver: true})
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

        this.loadRandomWord()
    }

    render() {
        const {id, setPage, withoutEpic} = this.props
        const content = this.state.testIsOver ? this.getSummaryContent() 
        : this.state.question.text == null ? this.getLoadingContent() : this.getQuestionComponent()

        return (
            <Panel id={id}>
                <PanelHeader>Тест уровня Java Juniour</PanelHeader>
                <Group>
                    <Div className="quiz_container">
                        {content}
                    </Div>
                </Group>
            </Panel>
        );
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
        return (
            <div>
                <div className="current_question"><a>{this.state.currentQuestionIndex} из {this.state.questionCount}</a></div>
                <Question question={this.state.question} onAnswerResult={(answer) => this.onAnswerResult(answer)}></Question>
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

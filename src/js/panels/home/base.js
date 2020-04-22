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
        question: []
    };

    componentDidMount() {
        this.loadRandomWord()
    }

    loadRandomWord() {
        axios.get(API_URL + "/question/random").then(res => this.setState({
            question: res.data
        }))
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
        } else {
            alert("Oh shit, wrong!")
        }

        this.loadRandomWord()
    }

    render() {
        const {id, setPage, withoutEpic} = this.props
        const content = this.state.question.text == null ? this.getLoadingContent() : this.getQuestionComponent()

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

    getQuestionComponent() {
        return <Question question={this.state.question} onAnswerResult={(answer) => this.onAnswerResult(answer)}></Question>
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

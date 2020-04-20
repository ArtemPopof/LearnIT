import React from 'react';
import {connect} from 'react-redux';

import {closePopout, goBack, openModal, openPopout, setPage} from '../../store/router/actions';

import {Div, Panel, Alert, Group, Button, PanelHeader} from "@vkontakte/vkui"

class HomePanelBase extends React.Component {

    state = {
        showImg: false
    };

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

    render() {
        const {id, setPage, withoutEpic} = this.props;

        return (
            <Panel id={id}>
                <PanelHeader>Тест уровня Java Juniour</PanelHeader>
                <Group>
                    <Div className="quiz_container">
                        <div className="question_card">
                            <p className="question_text">К чему можно применить модификатор final?</p>
                            <div className="answer_card">
                                <a className="answer_container">
                                    <a className="answer_number">1.</a>
                                    <a className="answer_text">К классу</a>
                                </a>
                            </div>
                            <div className="answer_card">
                                <a className="answer_container">
                                    <a className="answer_number">2.</a>
                                    <a className="answer_text">К методу</a>
                                </a>
                            </div>
                            <div className="answer_card">
                                <a className="answer_container">
                                    <a className="answer_number">3.</a>
                                    <a className="answer_text">К полю класса</a>
                                </a>
                            </div>
                            <div className="answer_card">
                                <a className="answer_container">
                                    <a className="answer_number">4.</a>
                                    <a className="answer_text">К аргументам метода</a>
                                </a>
                            </div>
                            <div className="answer_card">
                                <a className="answer_container">
                                    <a className="answer_number">5.</a>
                                    <a className="answer_text">Ко всему вышеперечисленному</a>
                                </a>
                            </div>
                        </div> 
                    </Div>
                </Group>
            </Panel>
        );
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

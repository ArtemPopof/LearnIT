import React from 'react';

class Question extends React.Component {

    state = {
        givenAnswerId: null,
        lastQuestion: null
    }

    render() {
        const answers = this.props.question.answers.split(';')
        if (this.state.lastQuestion != this.props.question.id) {
            this.prepareForNewQuestion()
        }

        return (
            <div style={{width: "85%", margin: "auto auto"}}>
                <h1 style={{color: "white"}}>{this.props.question.text}</h1>
                <ul className="level-chooser">
                    {answers.map((answer, index) => this.renderAnswer(answer, index))}
                </ul>
            </div>);
    }

    prepareForNewQuestion() {
        this.state = ({
            givenAnswerId: null,
            correctAnswered: null,
            lastQuestion: this.props.question.id
        })
    }

    renderAnswer(answer, index) {
        const cardClass = (this.state.givenAnswerId !== index || this.state.correctAnswered == null) ? "menu_item" 
        : this.state.correctAnswered ? "answer_card_correct" : "answer_card_wrong"

        return (
        <p className={cardClass} key={index} onClick={this.answerReceived.bind(this, index)}>
            <a className="answer_number">{index + 1}.</a>
            <a className="answer_text">{answer}</a>
        </p>
        )
    }

    async answerReceived(index) {
        if (this.props.onAnswerResult == null || this.state.givenAnswerId != null) {
            return
        }

        this.setState({
            givenAnswerId: index,
            correctAnswered: index == this.props.question.rightAnswer,
            lastQuestion: this.props.question.id
        })

        await new Promise(resolve => setTimeout(resolve, 100))

        this.props.onAnswerResult(this.state.correctAnswered)
    }
}

export default Question;
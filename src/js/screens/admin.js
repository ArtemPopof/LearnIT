import React from 'react';
import MainHeader from '../components/Header';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import * as Api from '../services/ApiController';
import cookie from 'js-cookie';
import axios from 'axios';

export default class AdminScreen extends React.Component {

    render() {
        return (
        <div>
                <MainHeader/>
                <div className="content">
                    <h1 style={{marginTop: "40px", marginBottom: "40px"}} className="label_header center-hor">LearnIT Admin panel</h1>
                    
                    <h3 className="label_header center-hor">Add new question</h3>
                    <div className="col-md-8 lcard center-hor-content center-hor">
                        <h2>Question</h2>
                        <InputText id="question"></InputText>
                        <h2>Answers</h2>
                        <InputText id="answers"></InputText>
                        <h2>Correct</h2>
                        <InputText id="correct"></InputText>
                        <h2>Level</h2>
                        <InputText id="level"></InputText>
                        <br/>
                        <Button style={{marginTop: "40px"}} onClick={() => this.saveQuestion()} label="Save" className="button p-button-warning"/>
                    </div>

                    <h3 style={{marginTop: "55px"}} className="label_header center-hor">Add new code task</h3>
                    <div className="col-md-8 lcard center-hor-content center-hor">
                        <h2>Title</h2>
                        <InputText id="title"></InputText>
                        <h2>Summary</h2>
                        <InputText id="summary"></InputText>
                        <h2>Description</h2>
                        <InputText id="description"></InputText>
                        <h2>Areas</h2>
                        <InputText id="areas"></InputText>
                        <h2>Level</h2>
                        <InputText id="task_level"></InputText>
                        <br/>
                        <Button style={{marginTop: "40px"}} onClick={() => this.saveTask()} label="Save" className="button p-button-warning"/>
                    </div>
                </div>
            </div>
        )
    }

    saveTask() {
        var titleValue = document.getElementById('title').value
        var summaryValue = document.getElementById('summary').value
        var descriptionValue = document.getElementById('description').value
        var areasValue = document.getElementById('areas').value
        var levelValue = document.getElementById('task_level').value

        axios({
            method: 'post',
            url: Api.API_URL + '/code/save',
              headers: {
                'Authorization': "Bearer " + cookie.get('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            data:JSON.stringify({
                title: titleValue,
                shortDescription: summaryValue,
                fullDescription: descriptionValue,
                areas: areasValue,
                level: levelValue
            })
        }).then(response => {
            console.log("saved task")
            console.log(response.data)
            document.location.href("/admin")
        }
        ).catch(response => {
            console.log("error")
            console.log(response)
        });  
      }
}

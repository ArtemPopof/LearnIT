import React from 'react';
import MainHeader from '../components/Header';
import { Button } from 'primereact/button';

import * as Api from '../services/ApiController';
import cookie from 'js-cookie';
import axios from 'axios';

export default class CodeTaskScreen extends React.Component {

    componentDidMount() {
        console.log("loading questions")
        axios({
            method: 'get',
            url: Api.API_URL + '/code/availableTasks?level=' + this.getLevel(),
            headers: {
                'Authorization': "Bearer " + cookie.get('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => {
            console.log("received tasks")
            console.log(response.data)
            this.setState({tasks: response.data})
        }
        ).catch(error => {
            console.log("error")
            console.log(error)
        });     
     }

    render() {
        return (
            <div>
                <MainHeader/>
                <div className="content center-hor" style={{padding: "30px"}}>
                    <div className="center-hor-content" style={{paddingTop: "50px"}}>
                        <h1 className="label_header" style={{marginBottom: "50px", marginTop: "50px"}}>Выберете задание уровня {this.getLevel()}</h1>
                        <div className="row">
                            {this.renderAllTasks()}
                            <div className="col-md-3" style={{marginTop: "25px"}}>
                                <div className="clickable-card lncard" style={{margin: "0"}}>
                                    <h3>Эхо</h3>
                                    <p style={{fontSize: "18px", fontWeight: "200", color: "rgba(255, 248, 248, 0.486)"}}>Ввод с клавиатуры и печать текста обратно пользователю</p>
                                    <span className="p-tag p-tag-rounded" style={{marginRight: "20px"}}>Java Core</span>
                                    <span className="p-tag p-tag-rounded" style={{marginRight: "20px"}}>Console</span>
                                    <span className="p-tag p-tag-rounded" style={{marginRight: "20px"}}>Code</span>
                                </div>
                            </div>
                            <div className="col-md-3" style={{marginTop: "25px"}}>
                                <div className="clickable-card lncard" style={{margin: "0"}}>
                                    <h3>Эхо</h3>
                                    <p style={{fontSize: "18px", fontWeight: "200", color: "rgba(255, 248, 248, 0.486)"}}>Ввод с клавиатуры и печать текста обратно пользователю</p>
                                    <span className="p-tag p-tag-rounded" style={{marginRight: "20px"}}>Java Core</span>
                                    <span className="p-tag p-tag-rounded" style={{marginRight: "20px"}}>Console</span>
                                    <span className="p-tag p-tag-rounded" style={{marginRight: "20px"}}>Code</span>
                                </div>
                            </div>
                            <div className="col-md-3" style={{marginTop: "25px"}}>
                                <div className="clickable-card lncard" style={{margin: "0"}}>
                                    <h3>Эхо</h3>
                                    <p style={{fontSize: "18px", fontWeight: "200", color: "rgba(255, 248, 248, 0.486)"}}>Ввод с клавиатуры и печать текста обратно пользователю</p>
                                    <span className="p-tag p-tag-rounded" style={{marginRight: "20px"}}>Java Core</span>
                                    <span className="p-tag p-tag-rounded" style={{marginRight: "20px"}}>Console</span>
                                    <span className="p-tag p-tag-rounded" style={{marginRight: "20px"}}>Code</span>
                                </div>
                            </div>
                            <div className="col-md-3" style={{marginTop: "25px"}}>
                                <div className="clickable-card lncard" style={{margin: "0"}}>
                                    <h3>Эхо</h3>
                                    <p style={{fontSize: "18px", fontWeight: "200", color: "rgba(255, 248, 248, 0.486)"}}>Ввод с клавиатуры и печать текста обратно пользователю</p>
                                    <span className="p-tag p-tag-rounded" style={{marginRight: "20px"}}>Java Core</span>
                                    <span className="p-tag p-tag-rounded" style={{marginRight: "20px"}}>Console</span>
                                    <span className="p-tag p-tag-rounded" style={{marginRight: "20px"}}>Code</span>
                                </div>
                            </div>
                            <div className="col-md-3" style={{marginTop: "25px"}}>
                                <div className="clickable-card lncard" style={{margin: "0"}}>
                                    <h3>Эхо</h3>
                                    <p style={{fontSize: "18px", fontWeight: "200", color: "rgba(255, 248, 248, 0.486)"}}>Ввод с клавиатуры и печать текста обратно пользователю</p>
                                    <span className="p-tag p-tag-rounded" style={{marginRight: "20px"}}>Java Core</span>
                                    <span className="p-tag p-tag-rounded" style={{marginRight: "20px"}}>Console</span>
                                    <span className="p-tag p-tag-rounded" style={{marginRight: "20px"}}>Code</span>
                                </div>
                            </div>
                            <div className="col-md-3" style={{marginTop: "25px"}}>
                                <div className="clickable-card lncard" style={{margin: "0"}}>
                                    <h3>Эхо</h3>
                                    <p style={{fontSize: "18px", fontWeight: "200", color: "rgba(255, 248, 248, 0.486)"}}>Ввод с клавиатуры и печать текста обратно пользователю</p>
                                    <span className="p-tag p-tag-rounded" style={{marginRight: "20px"}}>Java Core</span>
                                    <span className="p-tag p-tag-rounded" style={{marginRight: "20px"}}>Console</span>
                                    <span className="p-tag p-tag-rounded" style={{marginRight: "20px"}}>Code</span>
                                </div>
                            </div>
                            <div className="col-md-3" style={{marginTop: "25px"}}>
                                <div className="clickable-card lncard" style={{margin: "0"}}>
                                    <h3>Эхо</h3>
                                    <p style={{fontSize: "18px", fontWeight: "200", color: "rgba(255, 248, 248, 0.486)"}}>Ввод с клавиатуры и печать текста обратно пользователю</p>
                                    <span className="p-tag p-tag-rounded" style={{marginRight: "20px"}}>Java Core</span>
                                    <span className="p-tag p-tag-rounded" style={{marginRight: "20px"}}>Console</span>
                                    <span className="p-tag p-tag-rounded" style={{marginRight: "20px"}}>Code</span>
                                </div>
                            </div>
                            <div className="col-md-3" style={{marginTop: "25px"}}>
                                <div className="clickable-card lncard" style={{margin: "0"}}>
                                    <h3>Эхо</h3>
                                    <p style={{fontSize: "18px", fontWeight: "200", color: "rgba(255, 248, 248, 0.486)"}}>Ввод с клавиатуры и печать текста обратно пользователю</p>
                                    <span className="p-tag p-tag-rounded" style={{marginRight: "20px"}}>Java Core</span>
                                    <span className="p-tag p-tag-rounded" style={{marginRight: "20px"}}>Console</span>
                                    <span className="p-tag p-tag-rounded" style={{marginRight: "20px"}}>Code</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderAllTasks() {

    }

    getLevel() {
        if (this.props.level == "easy") {
            return 1
        }
        if (this.props.level == "middle") {
            return 2
        }
        if (this.props.level == "hard") {
            return 3
        }
    }
}

import React from 'react';
import MainHeader from '../components/Header';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';

import * as Api from '../services/ApiController';
import cookie from 'js-cookie';
import axios from 'axios';

export default class CodeTaskScreen extends React.Component {

    state = {
        reload: "true"
    }

    render() {
        this.loadTasks()
        if (this.state.state == "reload") {
            this.setState({currentTask: this.state.currentTask, state: ""})
            return <div></div>
        }
        if (this.state.currentTask == null) return this.renderTaskList()
        if (this.state.state == "taskUploaded") return this.uploadCompleteMessage()
        return this.renderTaskDetails()
    }

    loadTasks() {
        console.log("loading tasks")
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
            this.setState({taskLoadingError: error})
        });     
    }

    renderTaskDetails() {
        var task = this.state.currentTask

        return (
            <div>
                <MainHeader/>
                <div className="content center-hor" style={{padding: "30px"}}>
                    <div className="center-hor-content">
                        <div className="col-md-8" style={{marginTop: "66px", marginLeft: "auto", marginRight: "auto"}}>
                            <h1 style={{color: "white", marginBottom: "30px"}}>{task.title}</h1>
                            <div className="lncard" style={{margin: "0"}}>
                                <h3>Инструкции к выполнению</h3>
                                <p style={{background: "rgba(255, 248, 248, 0.1)", padding: "24px", textAlign: "left"}}>{task.fullDescription}</p>
                                <p style={{display: "none"}} id="taskId">{this.state.currentTask.id}</p>
                                <h3>Навыки</h3>
                                {task.areas.split(';').map((area) => this.renderArea(area))}
                                <h3 style={{marginTop: "24px"}}>Загрузка файлов выполненого задания</h3>
                                <p style={{fontSize: "18px", fontWeight: "200", color: "rgba(255, 248, 248, 0.486)"}}>Загрузите архив со всеми файлами выполненого задания. Проект должен содержать все файлы необходимые для компиляции и запуска выполненого задания (максимальный размер файла 1MB, допустимые форматы: .zip,.rar,.7z,.tar.gz,.java,.kt,.txt)</p>
                                <p id="loadedFile"></p>
                                <div id="fileInput">
                                    <FileUpload style={{marginTop: "25px"}} mode="basic" auto={true} customUpload uploadHandler={this.uploadFiles} chooseLabel="Выбрать" uploadLabel="Отправить" cancelLabel="Отменить" multiple accept=".zip,.rar,.7z,.tar.gz,.java,.kt,.txt" maxFileSize={1000000}></FileUpload>
                                </div>
                                <Button id="resetFile" onClick={() => this.setState({state: "reload"})} label="Отменить" className="button" style={{width: "auto", display: "none"}}/>
                                <br/>   
                                <Button id="submitFile" onClick={() => this.setState({state: "taskUploaded"})} label="Отправить на проверку" className="button p-button-warning" style={{width: "auto", marginTop: "40px", display: "none"}}/>
                            </div>
                        </div>
                        <Button onClick={() => document.location.reload()} label="К списку заданий" className="button" style={{marginTop: "100px", marginLeft: "30px"}}/>
                    </div>
                </div>
            </div>
            )
    }

    uploadTaskFile() {
        var component = document.getElementById("ff")
        console.log("component" + component)
    }

    uploadFiles(event) {
        const [file] = event.files;
        const fileReader = new FileReader();
        const taskId = document.getElementById("taskId").innerText;

        fileReader.onloadend = function (event) {
            console.log(fileReader.result)
            const formData = new FormData();
            formData.append('file', fileReader.result)

            axios({
                method: 'post',
                url: Api.API_URL + '/code/submit',
                headers: {
                    'Authorization': "Bearer " + cookie.get('token'),
                    'Accept': 'application/json',
                },
                data: {
                    base64: fileReader.result,
                    fileName: file.name,
                    taskId: taskId
                }
            }).then(response => {
                console.log("submitted")
                console.log(response.data)

                document.getElementById("loadedFile").innerText = file.name
                document.getElementById("fileInput").style.display = "none"
                document.getElementById("resetFile").style.display = "inline-block"
                document.getElementById("submitFile").style.display = "inline-block"
            }
            ).catch(error => {
                console.log("error")
                console.log(error)
            });     
        }
        fileReader.readAsDataURL(file);
    }

    renderTaskList() {
        return (
            <div>
                <MainHeader/>
                <div className="content center-hor" style={{padding: "30px"}}>
                    <div className="center-hor-content">
                        <h1 className="label_header" style={{marginBottom: "50px", marginTop: "50px"}}>Выберете задание уровня {this.getLevel()}</h1>
                        <div className="row">
                            {this.renderAllTasks()}
                        </div>

                        <Button onClick={() => document.location.href="/"} label="На главную" className="button" style={{marginTop: "100px", marginLeft: "30px"}}/>
                    </div>
                </div>
            </div>
        )
    }

    renderAllTasks() {
        if (this.state.taskLoadingError) return this.showError()
        if (this.state.tasks == null) return this.loadingMessage();
        if (this.state.tasks.length == 0) return this.emptyListWarning(); 

        return this.state.tasks.map((task) => this.renderTask(task))
    }

    renderTask(task) {
        var areas = task.areas.split(';')
        
        return (
            <div className="col-md-3" style={{marginTop: "25px"}}>
                <div onClick={() => this.setState({currentTask: task})}className="clickable-card lncard" style={{margin: "0"}}>
                    <h3>{task.title}</h3>
                    <p style={{fontSize: "18px", fontWeight: "200", color: "rgba(255, 248, 248, 0.486)"}}>{task.shortDescription}</p>
                    {areas.map((area) => this.renderArea(area))}
                </div>
            </div>
        )
    }


    renderArea(area) {
        return (
           <span className="p-tag p-tag-rounded" style={{marginRight: "20px"}}>{area}</span>
        )
    }

    loadingMessage() {
        return (
            <div className="col-md-12" style={{marginTop: "25px"}}>
                <div className="lncard" style={{margin: "0"}}>
                    <h1>Загрузка, подождите...</h1>
                </div>
            </div>
        )
    }

    emptyListWarning() {
        return (
            <div className="col-md-12" style={{marginTop: "25px"}}>
                <div className="lncard" style={{margin: "0"}}>
                    <h1>Нет доступных заданий</h1>
                </div>
            </div>
        )
    }
    uploadCompleteMessage() {
        return (
            <div>
                <MainHeader/>
                <div className="content center-hor" style={{padding: "80px"}}>
                    <div className="center-hor-content">
                        <div className="col-md-8" style={{marginTop: "25px", marginRight: "auto", marginLeft: "auto"}}>
                            <div className="lncard" style={{margin: "0"}}>
                                <h1>Задание загружено и будет проверено в ближайшее время</h1>
                                <p style={{fontSize: "18px", fontWeight: "200", color: "rgba(255, 248, 248, 0.486)"}}>Результаты проверки будут высланы на email, указанный при регистрации</p>
                                <Button onClick={() => this.setState({currentTask: null, state: null})} label="К списку заданий" className="button" style={{marginTop: "100px", marginLeft: "30px"}}/>                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    showError() {
        return (
            <div className="col-md-12" style={{marginTop: "25px"}}>
                <div className="lncard" style={{margin: "0"}}>
                    <h1>Ошибка при загрузке заданий, повторите попытку позже</h1>
                </div>
            </div>
        )
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

import React from 'react';
import MainHeader from '../components/Header';
import { Button } from 'primereact/button';

import * as Api from '../services/ApiController';
import axios from 'axios';

export default class LoginScreen extends React.Component {

    state = {
        emailInvalid: false,
        passwordInvalid: false,
        usernameInvalid: false
    }

    render() {
        if (this.props.newAccount) {
            return this.renderRegistrationPage();
        } else {
            return this.renderLoginPage();
        }
    }

    renderRegistrationPage() {
        return (
            <div>
                <MainHeader hostScreen="login"/>
                <div className="content">
                    <h1 className="label_header center-hor">Регистрация</h1>
                    <h2 className="label_subheader center-hor">Получи больше возможностей тестирования после регистрации</h2>
                    <br></br>
                    <div className="card center-hor-content center-hor">
                        <h3 className="label_header">Имя пользователя</h3>
                        <span className="p-input-icon-left">
                        <i className="pi pi-user" />
                            <input id="user" type="text" name="username" placeholder="Введите имя" className="p-inputtext p-component" style={{width: "200px"}}/>
                        </span>
                        <h3 className="label_header">Пароль</h3>
                        <input id="password" type="password" name="password" placeholder="Введите пароль" className="p-inputtext p-component"/>
                        <h3 className="label_header">Email</h3>
                            {this.renderEmailField()}
                        <br/>
                        <Button type="submit" onClick={() => this.register()} label="Готово" className="button p-button-success" style={{marginTop: "70px"}}/>
                    </div>
                </div>
            </div>
            
        );
    }

    renderLoginPage() {
        return (
            <div>
                <MainHeader hostScreen="login"/>
                <div className="content">
                    <h1 className="label_header center-hor">Вход</h1>
                    <h2 className="label_subheader center-hor">Доступ к проверке заданий</h2>
                    <br></br>
                    <form method="POST" className="card center-hor-content center-hor">
                        <h3 className="label_header">Email</h3>
                        <span className="p-input-icon-left">
                            <i className="pi pi-user"/>
                            {this.renderEmailField()}
                        </span>
                        {this.state.emailInvalid ? <div className="p-invalid">Email не корректный</div> : null}
                        <h3 className="label_header">Пароль</h3>
                        <input type="password" name="password" placeholder="Введите пароль" className="p-inputtext p-component"/>
                        <br/>
                        <Button type="submit" onClick={() => this.validateFields()} label="Готово" className="button p-button-success" style={{marginTop: "70px"}}/>
                    </form>
                </div>
            </div>
        );
    }

    renderEmailField() {
        var classes = this.state.emailInvalid == false ? "p-inputtext p-component" : "p-inputtext p-component p-invalid";

        return (
            <input id="email" type="email" name="email" placeholder="Введите email" className={classes} style={{width: "200px"}}/>
        );
    }
    
    register() {
        this.validateFields()
        
        console.log("register request")
        
        var email = document.getElementById('email').value
        var password = document.getElementById('password').value
        var user = document.getElementById('user').value
        
        this.sendRegisterRequest(user, password, email)
    }
    
    sendRegisterRequest(userValue, passwordValue, emailValue) {
            axios({
                method: 'post',
                url: Api.API_URL + '/user/register',
                data: {
                    user: userValue,
                    password: passwordValue,
                    email: emailValue
                }
            }).then(function (response) {
                return ""
            }).catch(function (response) {
                console.log("register request error")
                console.log(response)
                return response
            });
    }

    validateFields() {
        //this.validateEmail();
    }

}

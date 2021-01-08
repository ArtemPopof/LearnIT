import React from 'react';
import MainHeader from '../components/Header';
import { Button } from 'primereact/button';

import * as Api from '../services/ApiController';
import axios from 'axios';
import cookie from 'js-cookie';

export default class LoginScreen extends React.Component {

    state = {
        emailInvalid: false,
        passwordInvalid: false,
        usernameInvalid: false
    }

    render() {
        if (this.props.state == "confirmation") {
            if (this.state.confirmationSuccessed) {
                return this.renderConfirmationSuccess()
            }
            if (this.state.confirmationError) {
                return this.renderErrorMessage()
            }
            this.sendConfirmation(this.props.email, this.props.secret)
            return this.renderOngoingConfirmation()
        }

        if (this.props.newAccount) {
            return this.renderRegistrationPage();
        } else {
            return this.renderLoginPage();
        }
    }

    sendConfirmation(email, secret) {
        axios({
            method: 'post',
            url: Api.API_URL + '/user/confirm?' + 'email=' + email + '&secret=' + secret,
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }
        }).then(response => {
            console.log("confirmed")
            this.setState({confirmationSuccessed: true})
        }
        ).catch(error => {
            console.log("error")
            console.log(error)
            this.setState({confirmationError: error})
        }
        );
    }

    renderErrorMessage(error) {
        return (
            <div>
                <MainHeader hostScreen="login"/>
                <div className="content center-hor">
                    <div className="lcard center-hor" style={{margin: "auto", marginTop: "120px"}}>
                        <h1 className="label_header center-hor">Ошибка</h1>
                        <h2 className="label_subheader center-hor">Не удалось активировать аккаунт, попробуйте позже либо обратитесь в Поддержку по адресу сontact@abbysoft.org</h2>
                    </div>
                </div>
            </div>
        );
    }


    renderConfirmationSuccess() {
        return (
            <div>
                <MainHeader hostScreen="login"/>
                <div className="content center-hor">
                    <div className="lcard center-hor" style={{margin: "auto", marginTop: "120px"}}>
                        <h1 className="label_header center-hor">Активация</h1>
                        <h2 className="label_subheader center-hor">Аккаунт успешно активирован, теперь вам доступны закрытые материалы, а также 3 бесплатные проверки заданий ментором.</h2>
                        <Button type="submit" onClick={() => document.location.href="/sign_in"} label="Войти" className="button p-button-success" style={{marginTop: "35px"}}/>
                    </div>
                </div>
            </div>
        );
    }

    renderOngoingConfirmation() {
        return (
            <div>
                <MainHeader hostScreen="login"/>
                <div className="content center-hor">
                    <div className="lcard center-hor" style={{margin: "auto", marginTop: "120px"}}>
                        <h1 className="label_header center-hor">Активация</h1>
                        <h2 className="label_subheader center-hor">Подождите, идет активация аккаунта...</h2>
                    </div>
                </div>
            </div>
        );
    }

    renderRegistrationPage() {
        console.log("render")
        console.log(this.state)
        if (this.state.registrationComplete == true) return this.registrationCompleteScreen()
        return (
            <div>
                <MainHeader hostScreen="login"/>
                <div className="content">
                    <h1 className="label_header center-hor">Регистрация</h1>
                    <h2 className="label_subheader center-hor">Получи больше возможностей тестирования после регистрации</h2>
                    <br></br>
                    <div className="lcard center-hor-content center-hor">
                        <small id="error" className="p-invalid p-d-block">{this.state.validationError}</small>
                        <h3 className="label_header">Имя пользователя</h3>
                        <span className="p-input-icon-left">
                        <i className="pi pi-user" />
                            <input id="user" type="text" name="username" placeholder="Введите имя" className={this.getInputClass("user")} style={{width: "200px"}}/>
                        </span>
                        <h3 className="label_header">Пароль</h3>
                        <input id="password" type="password" name="password" placeholder="Введите пароль" className={this.getInputClass("password")}/>
                        <h3 className="label_header">Email</h3>
                            {this.renderEmailField()}
                        <br/>
                        <Button type="submit" onClick={() => this.register()} label="Готово" className="button p-button-success" style={{marginTop: "35px"}}/>
                        <div style={{position: "relative", marginTop: "20px", marginBottom: "40px"}}>
                            <delimiter> </delimiter>
                        </div>
                        <Button onClick={() => document.location.href="/sign_in"} label="Уже есть аккаунт" className="button p-button-warning"/>
                    </div>
                </div>
            </div>
            
        );
    }

    registrationCompleteScreen() {
        return (
            <div>
                <MainHeader hostScreen="login"/>
                <div className="content center-hor">
                    <div className="lcard center-hor" style={{margin: "auto", marginTop: "120px"}}>
                        <h1 className="label_header center-hor">Регистрация</h1>
                        <h2 className="label_subheader center-hor">На указанный email была выслана инструкция по активации аккаунта. Перейдите по ссылке из письма для того, чтобы иметь возможность пользоваться возможностями сервиса</h2>
                        <Button type="submit" onClick={() => document.location.href="/sign_in"} label="Готово" className="button p-button-success" style={{marginTop: "35px"}}/>
                    </div>
                </div>
            </div>
        );
    }
    
    getInputClass(error) {
        if (this.state.invalidField != error) return "p-inputtext p-component"
        else {
            return "p-invalid p-inputtext p-component"
        }
    }

    renderLoginPage() {
        return (
            <div>
                <MainHeader hostScreen="login"/>
                <div className="content">
                    <h1 className="label_header center-hor">Вход</h1>
                    <h2 className="label_subheader center-hor">Доступ к проверке заданий</h2>
                    <br></br>
                    <div className="lcard center-hor-content center-hor">
                        <small id="error" style={{fontSize: "24px"}}className="p-invalid p-d-block">{this.state.validationError}</small>
                        <h3 className="label_header">Имя пользователя</h3>
                        <span className="p-input-icon-left">
                            <i className="pi pi-user"/>
                            <input id="user" type="text" name="username" placeholder="Введите имя" className={this.getInputClass("user")} style={{width: "200px"}}/>
                        </span>
                        <h3 className="label_header">Пароль</h3>
                        <input id="password" type="password" name="password" placeholder="Введите пароль" className="p-inputtext p-component"/>
                        <br/>
                        <Button onClick={() => this.login()} label="Готово" className="button p-button-success" style={{marginTop: "40px"}}/>
                        <div style={{position: "relative", marginTop: "20px", marginBottom: "40px"}}>
                            <delimiter> </delimiter>
                        </div>
                        <Button onClick={() => document.location.href="/register"} label="Зарегистрироваться" className="button p-button-warning"/>
                    </div>
                </div>
            </div>
        );
    }

    renderEmailField() {
        var classes = this.state.emailInvalid == false ? "p-inputtext p-component" : "p-inputtext p-component p-invalid";

        return (
            <input id="email" type="email" name="email" placeholder="Введите email" className={this.getInputClass("email")} style={{width: "200px"}}/>
        );
    }
    
    login() {
        this.validateFields()
        
        console.log("login request")
        
        var user = document.getElementById('user').value
        var password = document.getElementById('password').value
        
        this.sendLoginRequest(user, password)
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
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                data:JSON.stringify({
                    user: userValue,
                    password: passwordValue,
                    email: emailValue
                })
            }).then(response => {
                console.log("registered")
                this.setState({registrationComplete: true})
            }
            ).catch(response => {
                console.log("error")
                console.log(response)
                if (response.response == undefined) return;
                console.log(response.response.data)
                this.setState({invalidField: response.response.data.field, validationError: response.response.data.error})
            }
        );
    }
    
    sendLoginRequest(userValue, passwordValue) {
            axios({
                method: 'post',
                url: Api.API_URL + '/user/login',
                data: {
                    password: passwordValue,
                    username: userValue
                }
            }).then(function (response) {
                cookie.set('token', response.data.token, { expires: 3600000 })
                cookie.set('user', response.data.username, { expires: 3600000 }) 
                cookie.set('checks', response.data.checks, { expires: 3600000 })
                console.log(cookie.get('token'))
                document.location.href = "/"
            }).catch(response => {
                console.log("login request error")
                console.log(response.response)
                if (response.response == null) {
                    this.setState({validationError: "Ошибка соединения с сервером, обратитесь в поддержку"})
                    return
                }
                if (response.response.data.error == "NOT_CONFIRMED") {
                    this.setState({validationError: "Аккаунт необходимо активировать через email указанный при регистрации"})
                }
            });
    }
    
    validateFields() {
        //this.validateEmail();
    }

}

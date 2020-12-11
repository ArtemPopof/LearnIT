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
        if (this.props.newAccount) {
            return this.renderRegistrationPage();
        } else {
            return this.renderLoginPage();
        }
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
                    <div className="card center-hor-content center-hor">
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
                    <div className="card center-hor" style={{margin: "auto", marginTop: "120px"}}>
                        <h1 className="label_header center-hor">Регистрация</h1>
                        <h2 className="label_subheader center-hor">Регистрация прошла успешно, войдите используя форму логина</h2>
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
                    <div className="card center-hor-content center-hor">
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
                console.log(cookie.get('token'))
                document.location.href = "/"
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

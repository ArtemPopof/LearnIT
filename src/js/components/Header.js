import React from 'react';
import cookie from 'js-cookie';

export default class MainHeader extends React.Component {

    render() {
        console.log("RENDER HEADER" + cookie.get('checks'))
        return (
            <header className="header">
                <h3><a href="/">LearnIT | <small>Подготовка профессионалов Java</small></a></h3>
                <div id="header_menu">
                    {cookie.get('token') != null ? this.renderAfterSignedMenu() : this.renderRegistrationMenu()}
                </div>
            </header>
        );
    }

    renderAfterSignedMenu() {
        return (
            <div>
                <span style={{marginRight: "24px"}}>{cookie.get('user')} | Баланс: <u style={{fontSize: "20px", color: "yellow"}}>{cookie.get('checks')}</u> проверок.</span>
                <a className="clickable" onClick={() => document.location.href="/purchase"} style={{marginRight: "20px"}}>Пополнить</a>
                <a className="clickable" onClick={() => this.logout()}>Выйти</a>
            </div>
        )
    }

    logout() {
        cookie.remove('token')
        cookie.remove('user')

        document.location.href="/"
    }

    renderRegistrationMenu() {
        if (this.props.hostScreen == "login") {
            return (            
                <div id="menu_sign_block">
                    <a href="/">На главную</a>
                </div>
            );
        }                   
        
        return (
            <div id="menu_sign_block">
                <a href="/register">Регистрация</a>
                <a href="/sign_in">Вход</a>
            </div>
        );
    }
}
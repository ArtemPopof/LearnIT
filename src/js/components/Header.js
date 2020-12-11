import React from 'react';
import cookie from 'js-cookie';

export default class MainHeader extends React.Component {

    render() {
        return (
            <header className="header">
                <h3><a href="https://abbysoft.org">AbbySoft | <small>Подготовка к собеседованию Java</small></a></h3>
                <div id="header_menu">
                    {cookie.get('token') != null ? this.renderAfterSignedMenu() : this.renderRegistrationMenu()}
                </div>
            </header>
        );
    }

    renderAfterSignedMenu() {
        return (
            <div>
                <span style={{marginRight: "24px"}}>Добро пожаловать, {cookie.get('user')}</span>
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
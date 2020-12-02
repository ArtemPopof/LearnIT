import React from 'react';

export default class MainHeader extends React.Component {

    render() {
        return (
            <header className="header">
                <h3><a href="https://abbysoft.org">AbbySoft | <small>Подготовка к собеседованию Java</small></a></h3>
                <div id="header_menu">
                    {this.renderRegistrationMenu()}
                </div>
            </header>
        );
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
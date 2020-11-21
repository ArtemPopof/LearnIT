import React from 'react';
import MainHeader from '../components/Header';
import { Button } from 'primereact/button';

export default class LoginScreen extends React.Component {

    render() {
        return (
            <div>
                <MainHeader/>
                <div className="content">
                    <h1 className="label_header center-hor">Регистрация</h1>
                    <h2 className="label_subheader center-hor">Получи больше возможностей тестирования после регистрации</h2>
                    <br></br>
                    <div className="card center-hor-content center-hor">
                        <h3 className="label_header">Имя пользователя</h3>
                        <span className="p-input-icon-left">
                        <i className="pi pi-user" />
                            <input type="text" placeholder="Введите имя" className="p-inputtext p-component" style={{width: "200px"}}/>
                        </span>
                        <h3 className="label_header">Пароль</h3>
                        <input type="text" placeholder="Введите пароль" className="p-inputtext p-component"/>
                        <h3 className="label_header">Email</h3>
                        <input type="text" placeholder="Введите email" className="p-inputtext p-component"/>
                        <br/>
                        <Button label="Готово" className="button p-button-success" style={{marginTop: "70px"}}/>
                    </div>
                </div>
            </div>
        );
    }
}
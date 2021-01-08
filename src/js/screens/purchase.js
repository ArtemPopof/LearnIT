import React from 'react';
import MainHeader from '../components/Header';
import { Button } from 'primereact/button';

import * as Api from '../services/ApiController';
import axios from 'axios';
import cookie from 'js-cookie';

export default class PurchaseScreen extends React.Component {

    state = {

    }

    render() {
        if (this.state.paymentError != null) return this.renderErrorMessage()
        if (this.state.state == "ongoingPayment") return this.renderPaymentOptionsPage()
        if (this.props.state == "successPayment") return this.renderSuccessPaymentPage()
        return this.renderPurchaseScreen()
    }

    renderPaymentOptionsPage() {
        return (
            <div>
                <MainHeader hostScreen="login"/>
                <div className="content">
                    <h1 style={{marginTop: "24px"}} className="label_header center-hor">Оплата</h1>
                    <h2 className="label_subheader center-hor">Выберете способ оплаты</h2>
                    <br></br>
                    <div className="lcard center-hor-content center-hor" style={{width: "40%", alignItems: "center"}}>
                        <h2 style={{marginBottom: "24px"}}>{this.state.checks} проверок за {this.state.sum}₽ </h2>
                        <div className="row">
                            <div className="col-md-6">
                                <div style={{background: "#ffffff07", padding: "24px"}}>
                                    <h2 style={{marginBottom: "24px"}}>Перевод c Яндекс Кошелька</h2>
                                    <iframe src={"https://yoomoney.ru/quickpay/button-widget?targets=%D0%9E%D0%BF%D0%BB%D0%B0%D1%82%D0%B0%20%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%BE%D0%BA%20%D0%B2%20%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%B5%20LearnIT&default-sum=" + this.state.sum + "&button-text=11&yoomoney-payment-type=on&button-size=l&button-color=orange&successURL=success_purchase" + this.state.checks + "&quickpay=small&account=4100116349347380&"} width="227" height="48" frameborder="0" allowtransparency="true" scrolling="no"></iframe>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div style={{background: "#ffffff07", padding: "24px"}}>
                                    <h2 style={{marginBottom: "24px"}}>Перевод с банковской карты</h2>
                                    <iframe src={"https://yoomoney.ru/quickpay/button-widget?targets=%D0%9E%D0%BF%D0%BB%D0%B0%D1%82%D0%B0%20%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%BE%D0%BA%20%D0%B2%20%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%B5%20LearnIT&default-sum=" + this.state.sum + "&button-text=11&any-card-payment-type=on&button-size=l&button-color=orange&successURL=success_purchase" + this.state.checks + "&quickpay=small&account=4100116349347380&"} width="227" height="48" frameborder="0" allowtransparency="true" scrolling="no"></iframe>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <small className="label_subheader center-hor">После выбора способа оплаты вы будете перенаправлены на сайт платежной системы</small>
                        <br></br>
                        <Button onClick={() => this.setState({state: "chooseOption"})} style={{marginTop: "24px"}} label="Назад" className="button p-button-warning"/>
                    </div>
                </div>
            </div>
        );
    }

    renderSuccessPaymentPage() {
        return (
            <div>
                <MainHeader hostScreen="login"/>
                <div className="content">
                    <div className="lcard center-hor-content center-hor" style={{width: "50%", alignItems: "center"}}>
                        <h1 style={{marginTop: "24px"}} className="label_header center-hor">Оплата</h1>
                        <h2 className="label_subheader center-hor" style={{marginBottom: "24px"}}>Оплата успешно завершена, счет пополнен на {this.props.checks} проверок</h2>
                        <Button onClick={() => document.location.href="/"} label="На главную" className="button p-button-warning"/>
                    </div>
                </div>
            </div>
        );
    }

    renderPurchaseScreen() {
        return (
            <div>
                <MainHeader hostScreen="login"/>
                <div className="content">
                    <h1 style={{marginTop: "24px"}} className="label_header center-hor">Оплата</h1>
                    <h2 className="label_subheader center-hor">Выберете желаемое количество проверок</h2>
                    <br></br>
                    <div className="lcard center-hor-content center-hor" style={{width: "80%", alignItems: "center"}}>
                        <small id="error" className="p-invalid p-d-block">{this.state.validationError}</small>
                        <div className="row">
                            <div className="col-md-4">
                                <div onClick={() => this.setState({state: "ongoingPayment", sum: 290, checks: 10})} className="clickable-card lcard" style={{width: "100%", background: "#4caf508c"}}>
                                    <h1>10 проверок</h1>
                                    <p className="label_subheader center-hor">Идеально для того, чтобы опробовать сервис</p>
                                    <br/>
                                    <br/>
                                    <h2>290 руб  / <span className="label_subheader">~29₽ за проверку</span></h2>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div onClick={() => this.setState({state: "ongoingPayment", sum: 790, checks: 30})} className="clickable-card lcard" style={{width: "100%", background: "rgb(241 216 0 / 60%)"}}>
                                    <h1>30 проверок</h1>
                                    <p className="label_subheader center-hor" style={{color: "#ffffffc4"}}>Хватит, чтобы получить множество дельных советов по повышению уровня</p>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <h2>790 руб  / <span className="label_subheader" style={{color: "#ffffffc4"}}>~26₽ за проверку</span></h2>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div onClick={() => this.setState({state: "ongoingPayment", sum: 1990, checks: 100})} className="clickable-card lcard" style={{width: "100%", background: "rgb(255 59 59 / 39%)"}}>
                                    <h1>100 проверок + <small>первый доступ к новым функциям</small></h1>
                                    <p className="label_subheader center-hor">Достаточно для длительного использования сервиса. Подойдет тем, кто хочет серьезно повысить уровень.<br/> <br/>В дополнение к проверкам данная опция позволяет получить приоритетный доступ к новым функциям сервиса.</p>
                                    <h2>1990 руб / <span className="label_subheader" style={{fontSize: "24px"}}>~20₽ за проверку</span></h2>
                                </div>
                            </div>
                        </div>
                        <Button onClick={() => document.location.href="/"} label="Назад" className="button p-button-warning"/>
                    </div>
                </div>
            </div>
            
        );
    }

    processPayment(amount) {
        axios({
            method: 'post',
            url: Api.API_URL + '/',
              headers: {
                'Authorization': "Bearer " + cookie.get('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            data:amount
        }).then(response => {
            console.log("payment success")
            console.log(response)
            document.location.href = "https://google.com"
        }
        ).catch(response => {
            console.log("error")
            console.log(response)
            this.setState({paymentError: "Возникла ошибка при общении с платежной системой, пожалуйста обратитесь в поддержку по адресу contact@abbysoft.org"})
        }
    );
    }

    renderErrorMessage() {
        return (
            <div>
                <MainHeader hostScreen="login"/>
                <div className="content center-hor">
                    <div className="lcard center-hor" style={{margin: "auto", marginTop: "120px"}}>
                        <h1 className="label_header center-hor">Ошибка</h1>
                        <h2 className="label_subheader center-hor">{this.state.paymentError}</h2>
                        <Button type="submit" onClick={() => document.location.href="/purchase"} label="Назад" className="button p-button-success" style={{marginTop: "35px"}}/>
                    </div>
                </div>
            </div>
        );
    }

}

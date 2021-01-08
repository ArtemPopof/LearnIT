import React from 'react';
import {connect} from 'react-redux';
import * as VK from './js/services/VK';

import Home from './js/panels/home/home'
import Test from './js/panels/home/test'

import LoginScreen from './js/screens/login'
import AdminScreen from './js/screens/admin'
import ProfileScreen from './js/screens/profile'
import CodeTaskScreen from './js/screens/code.js'
import PurchaseScreen from './js/screens/purchase.js'

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.lastAndroidBackAction = 0;
    }

    state = {
        screen: "home"
    }

    componentDidMount() {
        const {goBack, dispatch} = this.props;

        VK.initApp();

        window.onpopstate = () => {
            let timeNow = +new Date();

            if (timeNow - this.lastAndroidBackAction > 500) {
                this.lastAndroidBackAction = timeNow;

                goBack();
            } else {
                window.history.pushState(null, null);
            }
        };
    }

    render() {
        var screen
                
        var page = document.location.href.split("/")[3]

        if (page == "sign_in") {
            return (<LoginScreen newAccount={false}/>);
        }
        if (page == "register") {
            return (<LoginScreen newAccount={true}/>);
        }
        if (page == "admin") {
            return (<AdminScreen/>)
        }
        if (page == "profile") {
            return (<ProfileScreen/>)
        }
        if (page.startsWith("code_task")) {
            var level = page.substring(16)
            console.log(level)
            return (<CodeTaskScreen level={level}/>)
        }
        if (page.startsWith("email_confirmation")) {
            var secret = page.substring(26).split("&")[0]
            var email = page.substring(26).split("&")[1].substring(6)
            console.log(secret)
            console.log(email)
            return (<LoginScreen state="confirmation" email={email} secret={secret}/>)
        }
        if (page.startsWith("purchase")) {
            return <PurchaseScreen/>
        }
        if (page.startsWith("success_purchase")) {
            var checks = page.substring(24)
            console.log("successfully purchased " + checks + " checks")
            return (<PurchaseScreen state="successPayment" checks={checks}/>)
        }

        // if (page.startsWith("task_details")) {
        //     var id = page.substring(16)
        //     console.log("open task details")
        //     console.log(id)
        //     return (<CodeTaskDetailsScreen id={id}/>)
        // }

        switch (this.state.screen) {
            case "home":
                screen = <Home onStartTest={(level) => this.startTest(level)}/>
                break;
            case "test":
                screen = <Test level={this.state.testLevel}/>
                break;
            default:
                break;
        }
        return (
            screen
        );
    }

    startTest(level) {
        if (level.length > 0) {
            this.setState({
                screen: "test",
                testLevel: level
            })
        }
    }
}
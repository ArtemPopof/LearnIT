import React from 'react';
import {connect} from 'react-redux';
import * as VK from './js/services/VK';

import Home from './js/panels/home/home'
import Test from './js/panels/home/test'
import LoginScreen from './js/screens/login'

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
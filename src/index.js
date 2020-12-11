import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';

import '@vkontakte/vkui/dist/vkui.css';
import './css/main.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
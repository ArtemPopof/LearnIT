import React from 'react';
import MainHeader from '../components/Header';
import { Button } from 'primereact/button';

import * as Api from '../services/ApiController';
import axios from 'axios';

export default class ProfileScreen extends React.Component {

    render() {
        return (
            <div>
                Профиль
            </div>
        )
    }
}

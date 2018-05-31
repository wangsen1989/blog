import React from 'react'
import { connect } from "react-redux"
import cookie from 'react-cookies'
import axios from 'axios'
import { Button } from 'antd-mobile';

import Login from '../components/Login'
import UserInfo from '../components/UserInfo'
import style from './app.less'

@connect(
    state => ({
        loginStatus: state.userReducer.get('loginStatus'),
    }),
    {}
)
class User extends React.Component {
    constructor(props) {
        super(props)
        this.state = { userid: cookie.load('userid') }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ userid: cookie.load('userid') })
    }
    render() {
        const { userid } = this.state
        if (!userid) {
            return <Login />
        }
        return <UserInfo/>
    }
}

export default User;
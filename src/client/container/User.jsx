import React from 'react'
import { connect } from "react-redux"
import axios from 'axios'
import { Button } from 'antd-mobile';

import Login from '../components/Login'
// import { demoAction } from '../../redux/action/demo.action'
import style from './app.less'


class User extends React.Component {
    componentDidMount() {
        // this.props.demoAction({ name: 'wangsen' })
    }
    render() {
        debugger
        return (
            <div>
                {
                    this.props.loginStatus ?
                        <h3>登陆成功，用户资料页面</h3>
                        : <Login />

                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loginStatus: state.userReducer.get('loginStatus'),
    }
}
function mapDispachToProps(dispatch) {
    return {
        // demoAction,
    }
}
export default connect(mapStateToProps, mapDispachToProps)(User)
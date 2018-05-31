
import React from 'react'
import { connect } from 'react-redux'
import { Switch, Button, List, InputItem, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import cookie from 'react-cookies'
import { logOut, getUserInfo } from '../redux/action/user.action';


@connect(
    state => ({
        loginStatus: state.userReducer.get('loginStatus'),
        userInfo: state.userReducer.get('userInfo')
    }),
    { logOut, getUserInfo }
)

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     name: '',
        //     record: []
        // }
        this.handleLogOut = this.handleLogOut.bind(this)
    }
    componentDidMount() {
        if (cookie.load('userid') && !this.props.loginStatus) {
            // 用户刷新操作，reducer登录标志丢失，需要重新拉取
            this.props.getUserInfo({ _id: cookie.load('userid'), name: cookie.load('username') })
                .catch(err => {
                    // debugger
                })
        }
    }

    handleLogOut() {
        cookie.remove('userid')
        this.props.logOut()
    }
    render() {
        const { getFieldProps } = this.props.form;
        const { name, record } = this.props.userInfo.toJS();
        return (
            <List renderHeader={() => '个人资料'}>

                <WhiteSpace />
                <p>{name}</p>
                <WhiteSpace />
                <Button
                    type="primary"
                    onClick={this.handleLogOut}
                >退出</Button>

            </List>
        );
    }
}

export default createForm()(UserInfo);

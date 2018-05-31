
import React from 'react'
import { connect } from 'react-redux'
import { Switch, Button, List, InputItem, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import { login } from '../redux/action/user.action';

@connect(
    null,
    {
        login,
    }
)   

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this)
    }
    handleLogin() {
        this.props.login(this.props.form.getFieldsValue())
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <List renderHeader={() => '账户不存在将自动注册'}>

                <InputItem
                    {...getFieldProps('name')}
                    type="text"
                >账号</InputItem>
                <WhiteSpace />
                <InputItem
                    {...getFieldProps('password')}
                    type="password"
                    placeholder="******"
                    maxLength={16}
                >密码</InputItem>
                <WhiteSpace />
                <Button
                    type="primary"
                    onClick={this.handleLogin}
                >登录</Button>

            </List>
        );
    }
}

export default createForm()(Login);

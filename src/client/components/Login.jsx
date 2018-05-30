
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
        this.state = {
            name: '',
            password: ''
        }

        this.handleNameChange = this.handleNameChange.bind(this)
        this.handlePwdChange = this.handlePwdChange.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    handleNameChange(val) {
        this.setState({
            name: val
        })
    }
    handlePwdChange(val) {
        this.setState({
            password: val
        })
    }
    handleLogin() {
        this.props.login(this.state)
    }
    render() {
        const { getFieldProps } = this.props.form;
        const { name, password } = this.state;
        return (
            <List renderHeader={() => '账户不存在将自动注册'}>

                <InputItem
                    {...getFieldProps('name')}
                    type="text"
                    // clear={true}
                    value={name}
                    onChange={this.handleNameChange}
                >账号</InputItem>
                <WhiteSpace />
                <InputItem
                    {...getFieldProps('password')}
                    type="password"
                    placeholder="******"
                    maxLength={16}
                    // clear={true}
                    value={password}
                    onChange={this.handlePwdChange}
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


import React from 'react'
import { connect } from 'react-redux'
import { Switch, Button, List, InputItem, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import cookie from 'react-cookies'
import { logOut } from '../redux/action/user.action';


@connect(
    null,
    {logOut}
)   

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            record: []
        }
        this.handleLogOut = this.handleLogOut.bind(this)
    }
    handleLogOut() {
        cookie.remove('userid')
        this.props.logOut()
    }
    render() {
        const { getFieldProps } = this.props.form;
        const { name, record } = this.state;
        return (
            <List renderHeader={() => '个人资料'}>


                <WhiteSpace />

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


import React from 'react'
import { connect } from 'react-redux'
import { Switch, Button, List, InputItem, WhiteSpace, } from 'antd-mobile';
import cookie from 'react-cookies'
import { logOut, getUserInfo } from '../redux/action/user.action';

const Item = List.Item

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
        this.handleLogOut = this.handleLogOut.bind(this)
    }
    componentDidMount() {
        if (cookie.load('userid') && !this.props.loginStatus) {
            // 用户刷新操作，有cookie，但reducer登录标志丢失，需要重新拉取
            this.props.getUserInfo()
        }
    }

    handleLogOut() {
        cookie.remove('userid')
        this.props.logOut()
    }
    render() {
        const { name = '', records = [] } = this.props.userInfo.toJS();
        return (
            <List>
                <Item extra={name}>账号</Item>
                {/* <Item extra={0} arrow="horizontal" multipleLine onClick={() => { }}>关注</Item>
                <Item extra={0} arrow="horizontal" multipleLine onClick={() => { }}>收藏</Item> */}
                {/* <Item extra={records.length || 0} arrow="horizontal" multipleLine onClick={() => { }}>我的记录</Item> */}
                {/* <Item extra={0} arrow="horizontal" multipleLine onClick={() => { }}>我的评价</Item> */}
                <WhiteSpace />
                <Button
                    type="primary"
                    onClick={this.handleLogOut}
                >退出</Button>

            </List>
        );
    }
}

export default UserInfo;

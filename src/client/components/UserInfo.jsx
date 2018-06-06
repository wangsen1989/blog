
import React from 'react'
import { connect } from 'react-redux'
import { Button, List, WhiteSpace, ImagePicker } from 'antd-mobile';
import cookie from 'react-cookies'
import { logOut, getUserInfo, upLoadFile } from '../redux/action/user.action';

const Item = List.Item
const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
}, {
    url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
    id: '2122',
}];

@connect(
    state => ({
        loginStatus: state.userReducer.get('loginStatus'),
        userInfo: state.userReducer.get('userInfo')
    }),
    { logOut, getUserInfo, upLoadFile }
)

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
        }
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

    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({ files });
        if (files.length > 0) {
            this.props.upLoadFile(files[0].file)
                .then(res => {
                    this.props.getUserInfo()
                })
        }
    }

    render() {
        const { name = '', } = this.props.userInfo.toJS();
        const { files } = this.state;

        return (
            <List>
                <ImagePicker
                    files={files}
                    onChange={this.onChange}
                    selectable={files.length === 0}
                />
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

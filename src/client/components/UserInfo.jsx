
import React from 'react'
import { connect } from 'react-redux'
import { Button, List, WhiteSpace, ImagePicker } from 'antd-mobile';
import cookie from 'react-cookies'
import { logOut, getUserInfo, upLoadFile } from '../redux/action/user.action';
import style from './style.less'

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
            avatar: false,
        }
        this.handleLogOut = this.handleLogOut.bind(this)
        this.changeAvatar = this.changeAvatar.bind(this)
    }
    componentDidMount() {
        if (cookie.load('userid') && !this.props.loginStatus) {
            // 用户刷新操作，有cookie，但reducer登录标志丢失，需要重新拉取
            this.props.getUserInfo()
        }
        this.setState({ avatar: this.props.userInfo.get('avatar') })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.userInfo.get('avatar') !== nextProps.userInfo.get('avatar')) {
            this.setState({ avatar: nextProps.userInfo.get('avatar') })
        }
    }

    handleLogOut() {
        cookie.remove('userid')
        this.props.logOut()
    }

    onChange = (files, type, index) => {
        console.log(files, type, index);
        if (files.length > 0) {
            this.props.upLoadFile(files[0].file)
                .then(res => {
                    this.props.getUserInfo()
                })
        }
    }

    changeAvatar() {
        this.setState({ avatar: false })
    }

    render() {
        const { name = '', } = this.props.userInfo.toJS();
        const { avatar } = this.state;
        const avatarSrc = "http://localhost:9999/" + avatar

        return (
            <div>
                <WhiteSpace />
                {
                    avatar ?
                        <div
                            className={style.avatar}
                            style={{
                                backgroundImage: 'url(' + avatarSrc + ')'
                            }}
                            onClick={this.changeAvatar}
                        /> :
                        <div>
                            <ImagePicker
                                className={style.avatarPicker}
                                onChange={this.onChange}
                            />
                        </div>
                }
                <WhiteSpace />
                <div className={style.avatarText}>{name}</div>
                <WhiteSpace />
                <Button
                    type="primary"
                    onClick={this.handleLogOut}
                >退出</Button>

            </div>
        );
    }
}

export default UserInfo;

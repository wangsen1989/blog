
import React from 'react'
import { connect } from 'react-redux'
import { List, WhiteSpace, } from 'antd-mobile';
import { getUserInfo } from '../redux/action/user.action';

const Item = List.Item

@connect(
    state => ({
        userInfo: state.userReducer.get('userInfo')
    }),
    { getUserInfo }
)

class MyRecordsList extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // if (cookie.load('userid') && !this.props.loginStatus) {
        //     // 用户刷新操作，有cookie，但reducer登录标志丢失，需要重新拉取
        this.props.getUserInfo()
        // }
    }

    render() {
        const { records = [] } = this.props.userInfo.toJS();
        return (
            <List>

                {
                    records.map(record => {
                        return (
                            <Item
                                key={record.recordId}
                                arrow="horizontal"
                                multipleLine
                                onClick={() => {console.log(record) }}
                            >{record.title}</Item>
                        )
                    })
                }

            </List>
        );
    }
}

export default MyRecordsList;

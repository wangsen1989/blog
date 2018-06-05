
import React from 'react'
import { connect } from 'react-redux'
import { List, WhiteSpace, SwipeAction } from 'antd-mobile';
import { getUserInfo } from '../redux/action/user.action';
import { getArticleDetail, changeMyListVisible, recordingArticle } from '../redux/action/record.action'

import style from './style.less';

const Item = List.Item

@connect(
    state => ({
        userInfo: state.userReducer.get('userInfo')
    }),
    {
        getUserInfo,
        changeMyListVisible,
        recordingArticle,
        getArticleDetail,
    }
)

class MyRecordsList extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getUserInfo()
    }

    handleEditRecord(id) {
        this.props.changeMyListVisible(false)
        this.props.getArticleDetail(id)
    }

    render() {
        const { records = [] } = this.props.userInfo.toJS();
        return (
            <div className={style.myRecordsList}>
                <List>
                    {
                        records.reverse().map(record => {
                            return (
                                <SwipeAction
                                    style={{ backgroundColor: 'gray' }}
                                    autoClose
                                    right={[
                                        {
                                            text: '编辑',
                                            onPress: () => this.handleEditRecord(record.recordId),
                                            style: { backgroundColor: '#ddd', color: 'white' },
                                        },
                                        {
                                            text: '删除',
                                            onPress: () => console.log('delete'),
                                            style: { backgroundColor: '#F4333C', color: 'white' },
                                        },
                                    ]}
                                    onOpen={() => console.log('global open')}
                                    onClose={() => console.log('global close')}
                                >
                                    <Item
                                        key={record.recordId}
                                        arrow="horizontal"
                                        multipleLine
                                        onClick={() => { console.log(record) }}
                                    >{record.title}</Item>
                                </SwipeAction>
                            )
                        })
                    }
                </List>
            </div>
        );
    }
}

export default MyRecordsList;

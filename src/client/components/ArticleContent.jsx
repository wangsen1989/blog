import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from "react-redux"
import { Modal, Card, List, TextareaItem, Button, WhiteSpace } from 'antd-mobile';
import moment from 'moment'

import { changeArtModal, storeComment, submitComment } from '../redux/action/article.action'
import style from './style.less'
import { Item } from 'antd-mobile/lib/tab-bar';

@connect(
    state => ({
        $$articleDetail: state.articleReducer.get('$$articleDetail'),
        modalVisible: state.articleReducer.get('modalVisible'),
        comment: state.articleReducer.get('comment'),
    }),
    {
        changeArtModal,
        storeComment,
        submitComment,
    }
)

class ArticleContent extends React.Component {

    render() {
        const { title = '', content = '', comments = [], _id = '', username, createTime } = this.props.$$articleDetail.toJS()
        return (
            <Modal
                className={style.artModal}
                visible={this.props.modalVisible}
                transparent
                title={<span className={style.artTitle}>{title}</span>}
            >
                <p className={style.artTip}>
                <span className={style.artAuthor}>作者：{username}</span>
                <span className={style.artDate}>{moment(Number(createTime)).format('YYYY-MM-DD')}</span>
                </p>
                <pre className={style.artContent}>{content}</pre>
                <WhiteSpace />
                <Card>
                    <Card.Header
                        title={<span className={style.commentsHeader}>评论区</span>}
                    />
                    <Card.Body>
                        {comments.map((com, index) => {
                            return (
                                <div className={style.comment} key={index}>
                                    <div className={style.commentName}>
                                        <Item>{com.username}:</Item>
                                    </div>
                                    <pre className={style.commentContent}>{com.comment}</pre>
                                </div>
                            )
                        })}
                    </Card.Body>
                </Card>
                <WhiteSpace />
                <Card>
                    <Card.Body>
                        <TextareaItem
                            value={this.props.comment}
                            placeholder='说点什么吧'
                            onChange={val => this.props.storeComment(val)}
                            rows={5}
                        />
                    </Card.Body>
                </Card>
                <Button
                    type="primary"
                    onClick={() => {
                        console.log(this.props.comment)
                        this.props.submitComment({ _id, comment: this.props.comment })
                            .then(res => {
                                this.props.storeComment('')
                                this.props.changeArtModal(true, _id)
                            })
                    }}
                >评论</Button>

            </Modal>
        )
    }
}

export default ArticleContent;
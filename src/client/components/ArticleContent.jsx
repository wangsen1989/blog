import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from "react-redux"
import { Modal, Card, List, TextareaItem, Button, WhiteSpace } from 'antd-mobile';

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
        const { title = '', content = '', comments = [], _id = '' } = this.props.$$articleDetail.toJS()
        return (
            <Modal
                className={style.artModal}
                visible={this.props.modalVisible}
                transparent
                title={title}
            >

                <Card>
                    <Card.Body>
                        <div>{content}</div>
                    </Card.Body>
                </Card>


                <div className={style.commentsHeader}>评论区</div>
                <List>
                    <TextareaItem
                        value={this.props.comment}
                        onChange={val => this.props.storeComment(val)}
                        rows={5}
                    />
                </List>
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
                <WhiteSpace />


                <List>
                    {comments.reverse().map(com => {
                        return (
                            <div className={style.comment}>
                                <div className={style.commentName}>
                                    <Item>{com.username}:</Item>
                                </div>
                                <div className={style.commentContent}>
                                    <Item>{com.comment}</Item>
                                </div>
                            </div>
                        )
                    })}
                </List>
            </Modal>
        )
    }
}

export default ArticleContent;
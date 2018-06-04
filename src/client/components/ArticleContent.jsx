import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from "react-redux"
import { Modal, Card, List, TextareaItem, Button, WhiteSpace } from 'antd-mobile';

import { changeArtModal, storeComment, submitComment } from '../redux/action/article.action'
import style from './style.less'


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
                        this.props.storeComment('')
                    }}
                >评论</Button>
                <WhiteSpace />


                <Card>
                    <Card.Body>
                        {comments.map(comment => {
                            return (
                                <p>{comment}</p>
                            )
                        })}
                    </Card.Body>
                </Card>
            </Modal>
        )
    }
}

export default ArticleContent;
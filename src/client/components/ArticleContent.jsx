import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from "react-redux"
import { Modal, Card } from 'antd-mobile';

import { changeArtModal } from '../redux/action/article.action'
import style from './style.less'


@connect(
    state => ({
        $$articleDetail: state.articleReducer.get('$$articleDetail'),
        modalVisible: state.articleReducer.get('modalVisible'),
    }),
    {
        changeArtModal,
    }
)

class ArticleContent extends React.Component {

    render() {
        return (
            <Modal
                className={style.artModal}
                visible={this.props.modalVisible}
                transparent
                // closable
                // maskClosable={true}
                onClose={() => {
                    // this.props.changeArtModal(false)
                }
                }
                title={this.props.$$articleDetail.toJS().title}
            >

                <Card>
                    <Card.Body>
                        <div>{this.props.$$articleDetail.toJS().content}</div>
                    </Card.Body>
                </Card>

                <div className={style.commentsHeader}>评论区</div>
                <Card>
                    <Card.Body>
                        {this.props.$$articleDetail.toJS().comments || [].map(comment => {
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
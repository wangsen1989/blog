/* eslint no-dupe-keys: 0 */
import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from "react-redux"
// import { ListView, WhiteSpace, Card, WingBlank } from 'antd-mobile';
// import moment from 'moment'

// import { getArticles } from '../redux/action/article.action'


@connect(
    state => ({
        // $$articles: state.articleReducer.get('articles'),
        // noMore: state.articleReducer.get('noMore'),
    }),
    {
        // getArticles,
    }
)

class ArticleContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // dataSource,
            // noMore: false,
        };

        // this.onEndReached = this.onEndReached.bind(this)
        // this.renderRow = this.renderRow.bind(this)

    }

    componentDidMount() {
    }

    render() {
        return (
            <div>内容</div>
        );
    }
}

export default ArticleContent;
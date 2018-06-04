import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from "react-redux"
import { ListView, WhiteSpace, Card, WingBlank, Modal, PullToRefresh } from 'antd-mobile';
// import moment from 'moment'
import ArticleContent from './ArticleContent'
import { getArticles, changeArtModal } from '../redux/action/article.action'
import style from './style.less'

let pageNo = 0;
let changeRouter = false
let scrollTop = 0

@connect(
    state => ({
        $$articles: state.articleReducer.get('$$articles'),
        noMore: state.articleReducer.get('noMore'),
    }),
    {
        getArticles,
        changeArtModal,
    }
)

class ArticleListView extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            dataSource,
            noMore: false,
        };

        this.onRefresh = this.onRefresh.bind(this)
        this.onEndReached = this.onEndReached.bind(this)
        this.renderRow = this.renderRow.bind(this)

    }

    componentDidMount() {
        if (!changeRouter) {
            this.props.getArticles(0)
        } else {
            const articles = this.props.$$articles.toJS()
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(articles),
                noMore: this.props.noMore,
            });
        }
        // xx.scrollTo(0,800); // 必须使用setTimeout才生效
        // this.timer = setTimeout(() => document.documentElement.scrollTo(0,scrollTop), 1000);
        this.timer = setTimeout(() => this.lv.scrollTo(0, scrollTop), 1000);



    }

    componentWillUnmount() {
        changeRouter = true
        scrollTop = document.documentElement.scrollTop
        console.log('scrollTop', scrollTop);
        this.timer && clearTimeout(this.timer);

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.$$articles !== nextProps.$$articles) {
            const articles = nextProps.$$articles.toJS()
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(articles),
            });
        }
        if (this.props.noMore !== nextProps.noMore) {
            this.setState({
                noMore: nextProps.noMore,
            });
        }
    }
    onRefresh() {
        this.setState({ refreshing: true });
        pageNo = 0
        this.props.getArticles(0)
            .then(() => {
                this.setState({
                    refreshing: false,
                });
            })
    };
    onEndReached = (event) => {
        if (this.state.noMore) {
            return;
        }
        this.props.getArticles(++pageNo)
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <div key={rowData._id}>
                <WingBlank size="sm">
                    <WhiteSpace size="sm" />
                    <Card onClick={() => {
                        this.props.changeArtModal(true, rowData._id)
                    }
                    }>
                        <Card.Body>
                            <div>{rowData.title}</div>
                        </Card.Body>
                        <Card.Footer
                            content={`${rowData.comments.length}评论`}
                            extra={<div>{rowData.username}</div>} />
                    </Card>
                </WingBlank>
            </div>
        );
    };

    render() {
        return (
            <div>
                <ArticleContent />
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderFooter={() => (
                        <div style={{ padding: 5, textAlign: 'center' }}>
                            {this.state.noMore ? '已无更多！' : '加载中...'}
                        </div>)}
                    renderRow={this.renderRow}
                    pageSize={10}
                    useBodyScroll
                    scrollRenderAheadDistance={500}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={100}
                    pullToRefresh={<PullToRefresh
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />}

                />
            </div>
        );
    }
}

export default ArticleListView;
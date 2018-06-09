import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from "react-redux"
import { WhiteSpace, Card, WingBlank, Modal, PullToRefresh, Toast } from 'antd-mobile';
// import moment from 'moment'
import ArticleContent from './ArticleContent'
import { getArticles, changeArtModal } from '../redux/action/article.action'
import style from './style.less'

let pageNo = 0;
let changeRouter = false
let preScrollTop = 0
let currentScrollTop = 0

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
        // const dataSource = new ListView.DataSource({
        //     rowHasChanged: (row1, row2) => row1 !== row2,
        // });
        this.state = {
            dataSource: [],
            noMore: false,
            goDown: false,
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
                // dataSource: this.state.dataSource.cloneWithRows(articles),
                dataSource: articles,
                noMore: this.props.noMore,
            });
        }

        ReactDOM.findDOMNode(this.ptr).addEventListener('scroll', (e) => {
            preScrollTop = currentScrollTop
            currentScrollTop = e.target.scrollTop
            this.setState({ goDown: currentScrollTop > preScrollTop })
        }, false)

        // xx.scrollTo(0,800); // 必须使用setTimeout才生效
        this.timer = setTimeout(() => {
            ReactDOM.findDOMNode(this.ptr).scrollTo(0, currentScrollTop)
        }, 0);


    }

    componentWillUnmount() {
        changeRouter = true
        this.timer && clearTimeout(this.timer);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.$$articles !== nextProps.$$articles) {
            const articles = nextProps.$$articles.toJS()
            this.setState({
                // dataSource: this.state.dataSource.cloneWithRows(articles),
                dataSource: articles,
            });
        }
        if (this.props.noMore !== nextProps.noMore) {
            this.setState({
                noMore: nextProps.noMore,
            });
            if(nextProps.noMore){
                Toast.info('已无更多', 1)
            }
        }
    }
    onRefresh() {
        pageNo = 0
        this.props.getArticles(0)
    };
    onEndReached = (event) => {
        if (this.state.noMore) {
            Toast.info('已无更多', 1)
            return;
        }
        this.props.getArticles(++pageNo)
    }

    renderRow() {
        return (
            <div>
                {
                    this.state.dataSource.map(rowData => {
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
                        )
                    })
                }
            </div>
        );
    };

    render() {
        const { goDown } = this.state
        const indicator = goDown ? { deactivate: '上拉加载更多', activate: '加载中...', finish: '加载完成' } :
            { deactivate: '下拉重载', activate: '重载中...', finish: '重载完成' }
        return (
            <div>
                <ArticleContent />
                {/* <ListView
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
                /> */}
                <PullToRefresh
                    damping={50}
                    ref={el => this.ptr = el}
                    style={{
                        height: document.documentElement.clientHeight - 95,
                        overflow: 'auto',
                    }}
                    className={style.pullToRefresh}
                    indicator={indicator}
                    direction={goDown ? 'up' : 'down'}
                    onRefresh={() => {
                        goDown ? this.onEndReached() : this.onRefresh()
                    }}
                >
                    {this.renderRow()}
                </PullToRefresh>
            </div>
        );
    }
}

export default ArticleListView;
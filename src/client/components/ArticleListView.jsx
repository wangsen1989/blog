/* eslint no-dupe-keys: 0 */
import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from "react-redux"
import { ListView } from 'antd-mobile';

import { getArticles } from '../redux/action/article.action'


let pageNo = 0;
let changeRouter = false

@connect(
    state => ({
        $$articles: state.articleReducer.get('articles'),
        noMore: state.articleReducer.get('noMore'),
    }),
    {
        getArticles,
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
        this.onEndReached = this.onEndReached.bind(this)
    }

    componentDidMount() {
        console.log('componentDidMount');
        if (!changeRouter) {
            this.props.getArticles(0)
        } else {
            const articles = this.props.$$articles.toJS()
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(articles),
                noMore: this.props.noMore,
            });
        }
    }
    componentWillUnmount() {
        console.log('componentWillUnmount');
        changeRouter = true
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.$$articles !== nextProps.$$articles) {
            console.log('nextProps', nextProps);
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


    onEndReached = (event) => {
        // debugger
        if (this.state.noMore) {
            return;
        }
        console.log('reach end', event);
        this.props.getArticles(++pageNo)
    }

    render() {
        const row = (rowData, sectionID, rowID) => {
            return (
                <div key={rowID} style={{ height: 150 }}>
                    <div>{rowData.title}</div>
                </div>
            );
        };
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderHeader={() => <span>header</span>}
                renderFooter={() => (
                    <div style={{ padding: 5, textAlign: 'center' }}>
                        {this.state.noMore ? '已无更多！' : '加载中...'}
                    </div>)}
                renderRow={row}
                pageSize={10}
                useBodyScroll
                scrollRenderAheadDistance={500}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={100}
            />
        );
    }
}

export default ArticleListView;
/* eslint no-dupe-keys: 0 */
import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from "react-redux"
import { ListView } from 'antd-mobile';

import { getArticles } from '../redux/action/article.action'


const NUM_ROWS = 10;
let pageIndex = 0;
let changeRouter = false

@connect(
    state => ({
        $$articles: state.articleReducer.get('articles')
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
            isLoading: true,
        };
        this.onEndReached = this.onEndReached.bind(this)
    }

    componentDidMount() {
        console.log('componentDidMount');
        if(!changeRouter) {
            this.props.getArticles(0)
        }else{
            const articles = this.props.$$articles.toJS()
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(articles),
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
    }


    onEndReached = (event) => {
        // debugger
        // if (this.state.isLoading && !this.state.hasMore) {
        //     return;
        // }
        console.log('reach end', event);
        this.props.getArticles(++pageIndex)
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
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderHeader={() => <span>header</span>}
                renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isLoading ? 'Loading...' : 'Loaded'}
                </div>)}
                renderRow={row}
                className="am-list"
                pageSize={4}
                useBodyScroll
                onScroll={() => { console.log('scroll'); }}
                scrollRenderAheadDistance={500}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
        );
    }
}

export default ArticleListView;
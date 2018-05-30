import React from 'react'
import { withRouter } from 'react-router-dom'
import { TabBar } from 'antd-mobile';
import style from './style.less';

class FooterTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'article',
    };
  }

  render() {
    console.log(this.props)
    return (
      <div className={style.footerTabs}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
        >
          <TabBar.Item
            icon={{ uri: require('./assets/images/article_unselect.png') }}
            selectedIcon={{ uri: require('./assets/images/article_select.png') }}
            title="文章"
            key="article"
            selected={this.state.selectedTab === 'article'}
            onPress={() => {
              this.setState({
                selectedTab: 'article',
              });
              this.props.history.push('/article')
            }}
          />
          <TabBar.Item
            icon={{ uri: require('./assets/images/record_unselect.png') }}
            selectedIcon={{ uri: require('./assets/images/record_select.png') }}
            title="记录"
            key="record"
            selected={this.state.selectedTab === 'record'}
            onPress={() => {
              this.setState({
                selectedTab: 'record',
              });
              this.props.history.push('/record')
            }}
          />
          <TabBar.Item
            icon={{ uri: require('./assets/images/user_unselect.png') }}
            selectedIcon={{ uri: require('./assets/images/user_select.png') }}
            title="我"
            key="user"
            selected={this.state.selectedTab === 'user'}
            onPress={() => {
              this.setState({
                selectedTab: 'user',
              });
              this.props.history.push('/user')
            }}
          />
        </TabBar>
      </div>
    );
  }
}

export default withRouter(FooterTabs);
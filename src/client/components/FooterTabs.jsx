import React from 'react'
import { withRouter } from 'react-router-dom'
import { TabBar } from 'antd-mobile';
import style from '../container/app.less';

class FooterTabs extends React.Component {

  render() {
    const { pathname = '/' } = this.props.location
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
            selected={pathname === '/'}
            onPress={() => {
              this.props.history.push('/')
            }}
          />
          <TabBar.Item
            icon={{ uri: require('./assets/images/record_unselect.png') }}
            selectedIcon={{ uri: require('./assets/images/record_select.png') }}
            title="记录"
            key="record"
            selected={pathname === '/record'}
            onPress={() => {
              this.props.history.push('/record')
            }}
          />
          <TabBar.Item
            icon={{ uri: require('./assets/images/user_unselect.png') }}
            selectedIcon={{ uri: require('./assets/images/user_select.png') }}
            title="我"
            key="user"
            selected={pathname === '/user'}
            onPress={() => {
              this.props.history.push('/user')
            }}
          />
        </TabBar>
      </div>
    );
  }
}

export default withRouter(FooterTabs);
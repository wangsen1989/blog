

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { NavBar, Icon } from 'antd-mobile';
import { login } from '../redux/action/user.action';

@connect(
    null,
    {
        login,
    }
)

class NavHeader extends React.Component {

    render() {
        console.log(this.props)
        const { pathname = '/' } = this.props.location
        const name = pathname === '/' || pathname === '/article' ? '文章' :
            pathname === '/record' ? '记录' :
                pathname === '/user' ? '我' : ''
        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <Icon key="0" type="ellipsis" onClick={() => console.log('onrightContentClick')} />,
                    ]}
                >{name}</NavBar>
            </div>
        )
    }

}

export default withRouter(NavHeader);


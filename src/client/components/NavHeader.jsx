

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { NavBar, Icon } from 'antd-mobile';
import { changeMyListVisible } from '../redux/action/record.action'
import { changeArtModal } from '../redux/action/article.action'

import style from '../container/app.less';

@connect(
    state => ({
        modalVisible: state.articleReducer.get('modalVisible'),
        listVisibel: state.recordReducer.get('listVisibel'),
    }),
    {
        changeArtModal,
        changeMyListVisible,
    }
)
class NavHeader extends React.Component {

    render() {
        const { modalVisible, listVisibel } = this.props
        console.log({ modalVisible, listVisibel })
        const { pathname = '/' } = this.props.location
        const name = pathname === '/' ? '阅读' :
            pathname === '/record' ? '写作' :
                pathname === '/user' ? '我' : ''

        const otherProps = {}
        if (pathname === '/' && modalVisible) {
            otherProps.icon = <Icon type="left" />
            otherProps.onLeftClick = () => {
                this.props.changeArtModal(false)
            }
        }
        if (pathname === '/record' && !listVisibel) {
            otherProps.icon = <Icon type="left" />
            otherProps.onLeftClick = () => {
                this.props.changeMyListVisible(true)
            }
        }
        return (
            <div className={style.navHeaders}>
                <NavBar
                    mode="dark"
                    {...otherProps}
                    rightContent={[
                        <Icon key="0" type="ellipsis" onClick={() => console.log('onrightContentClick')} />,
                    ]}
                >{name}</NavBar>
            </div>
        )
    }

}

export default withRouter(NavHeader);


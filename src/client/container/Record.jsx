import React from 'react'
import { connect } from "react-redux"
import axios from 'axios'
import { Icon, Card, WhiteSpace, Modal, List } from 'antd-mobile';

const Item = List.Item

import AddRecord from '../components/AddRecord'
import MyRecordsList from '../components/MyRecordsList'

import { changeMyListVisible } from '../redux/action/record.action'
import style from './app.less'

@connect(
  state => ({
    listVisibel: state.recordReducer.get('listVisibel'),
    userInfo: state.userReducer.get('userInfo'),
  }),
  {
    changeMyListVisible
  }
)
class Record extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddRecord = this.handleAddRecord.bind(this)
  }
  handleAddRecord() {
    this.props.changeMyListVisible(false)
  }
  render() {
    const { records = [] } = this.props.userInfo.toJS();

    return (
      <div>

        {
          this.props.listVisibel ?
            <Item
              className={style.recordsCount}
              extra={<img
                style={{ width: 25 }}
                src={require('../components/assets/images/addRecord.png')}
                onClick={this.handleAddRecord}
              />}
              multipleLine>
              共{records.length}篇
            </Item>
            : null
        }

        {
          this.props.listVisibel ? <MyRecordsList /> : <AddRecord />
        }

      </div >
    )
  }
}

export default Record;
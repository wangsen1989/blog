import React from 'react'
import { connect } from "react-redux"
import axios from 'axios'
import { Icon, Card, WhiteSpace, Modal, List } from 'antd-mobile';

const Item = List.Item

import AddRecord from '../components/AddRecord'
import { changeMyListVisible } from '../redux/action/record.action'

@connect(
  state => ({
    listVisibel: state.recordReducer.get('listVisibel'),
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

    return (
      <div>

        {
          this.props.listVisibel ?
            <Item
              extra={<img
                style={{ width: 25 }}
                src={require('../components/assets/images/addRecord.png')}
                onClick={this.handleAddRecord}
              />}
              multipleLine>
              共n篇
            </Item>
            : null
        }

        {
          this.props.listVisibel ? <div>记录列表</div> : <AddRecord />
        }

      </div >
    )
  }
}

export default Record;
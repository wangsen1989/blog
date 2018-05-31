import React from 'react'
import { connect } from "react-redux"
import axios from 'axios'
import { Icon, Card, WhiteSpace, Modal, List } from 'antd-mobile';

const Item = List.Item

import AddRecord from '../components/AddRecord'
// import { demoAction } from '../../redux/action/demo.action'


class Record extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listVisibel: true
    }

    this.handleAddRecord = this.handleAddRecord.bind(this)
    this.handleVisibel = this.handleVisibel.bind(this)
  }
  componentDidMount() {
    // this.props.demoAction({ name: 'wangsen' })
  }
  handleAddRecord() {
    this.setState({ listVisibel: false })
  }
  handleVisibel() {
    this.setState({ listVisibel: true })
  }
  render() {

    return (
      <div>

        <Item
          extra={<img
            style={{ width: 25 }}
            src={require('../components/assets/images/addRecord.png')}
            onClick={this.handleAddRecord}
          />}
          multipleLine>
          共n篇
        </Item>

        {
          this.state.listVisibel ? <div>记录列表</div> : <AddRecord onChange={this.handleVisibel} />
        }

      </div >
    )
  }
}

function mapStateToProps(state) {
  return {
    // list: state.demoReducer.get('list'),
  }
}
function mapDispachToProps(dispatch) {
  return {
    // demoAction,
  }
}
export default connect(mapStateToProps, mapDispachToProps)(Record)
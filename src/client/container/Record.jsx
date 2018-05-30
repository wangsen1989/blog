import React from 'react'
import { connect } from "react-redux"
import axios from 'axios'

// import { demoAction } from '../../redux/action/demo.action'


class Record extends React.Component {
  componentDidMount() {
    // this.props.demoAction({ name: 'wangsen' })
  }
  render() {
    return (
      <div>
        this  is  Record
      </div>
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
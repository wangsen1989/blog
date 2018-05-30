import React from 'react'
import { connect } from "react-redux"
import axios from 'axios'

import { demoAction } from '../../redux/action/demo.action'


class Demo extends React.Component {
  componentDidMount() {
    // this.props.demoAction({ name: 'wangsen' })
  }
  render() {
    return (
      <div>
        this  is  a Demo
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
    // demoAction: (opts) => dispatch(demoAction(opts))
    demoAction,
  }
}
export default connect(mapStateToProps, mapDispachToProps)(Demo)
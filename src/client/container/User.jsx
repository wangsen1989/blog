import React from 'react'
import { connect } from "react-redux"
import axios from 'axios'

// import { demoAction } from '../../redux/action/demo.action'


class User extends React.Component {
  componentDidMount() {
    // this.props.demoAction({ name: 'wangsen' })
  }
  render() {
    return (
      <div>
        this  is  User
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
export default connect(mapStateToProps, mapDispachToProps)(User)
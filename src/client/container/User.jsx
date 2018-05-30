import React from 'react'
import { connect } from "react-redux"
import axios from 'axios'
import { Button } from 'antd-mobile';

// import { demoAction } from '../../redux/action/demo.action'
import style from './app.less'


class User extends React.Component {
  componentDidMount() {
    // this.props.demoAction({ name: 'wangsen' })
  }
  render() {
    return (
      <div>
        <h3 className={style.test}>this  is  User!</h3>
        <Button type="primary">点击</Button>
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
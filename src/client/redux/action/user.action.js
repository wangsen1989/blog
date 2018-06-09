import pwdSault from "../../utils/pwdSault";
import axiosData from "../../utils/axiosData";
import Axios from "axios";
import { Toast } from 'antd-mobile';


export const LOAD_USER_INFO = 'load user info'

export const LOGOUT = 'logout'

const lodUserInfo = (payload) => ({
  type: LOAD_USER_INFO,
  payload,
})

export const login = (opts) => {
  return dispatch => {
    const { name, password } = opts
    if (!name || !password) {
      Toast.fail('执行失败，请检查填写是否合法', 1);
      return;
    }
    axiosData('/api/login', { name, password: pwdSault(password) })
      .then(res => {
        dispatch(lodUserInfo(res.data))
      })
      .catch(err => {
        console.log(err)
      })
  }
}


export const getUserInfo = () => {
  return dispatch => {
    return axiosData('/api/userInfo')
      .then(res => {
        const { data = {} } = res
        dispatch(lodUserInfo(data))
        // return Promise.resolve(data)
      })
      .catch(err => {
        // return Promise.reject(err)
        console.log(err)
      })
  }
}

export const logOut = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT,
    })
  }
}

export const upLoadFile = (file) => {
  return dispatch => {
    const formData = new FormData()
    formData.append('avatar', file)
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    return Axios.post('/api/upLoadFile', formData, config)
      .then(res => {
        if (res.data.code === '000') {
          console.log(res.data.data)
          return Promise.resolve(res.data.data)
        } else {
          return Promise.reject(res.data.data)
        }
      }).catch(err => Promise.reject(err))
    // dispatch({
    //     type: LOGOUT,
    // })
  }
}


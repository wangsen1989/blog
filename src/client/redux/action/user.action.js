import Axios from "axios";

export const LOAD_USER_INFO = 'load user info'
export const LOGOUT = 'logout'

const lodUserInfo =(payload)=>({
    type: LOAD_USER_INFO,
    payload,
})

export const login = (opts) => {
    return dispatch => {
        Axios.post('./api/user', opts).then(res => {
            console.log(res.data)
            if (res.data.code = '000') {
                dispatch(lodUserInfo(res.data.data))
            }
        })
    }
}


export const getUserInfo = (opts) => {
    return dispatch => {
        Axios.post('./api/userInfo', opts).then(res => {
            console.log(res.data)
            if (res.data.code = '000') {
                dispatch(lodUserInfo(res.data.data))
            }
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


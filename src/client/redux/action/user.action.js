import Axios from "axios";
import axiosData from "../../utils/axiosData";

export const LOAD_USER_INFO = 'load user info'

export const LOGOUT = 'logout'

const lodUserInfo = (payload) => ({
    type: LOAD_USER_INFO,
    payload,
})

export const login = (opts) => {
    return dispatch => {
        axiosData('./api/user', opts).then(res => {
            console.log(res.data)
            dispatch(lodUserInfo(res.data))
        })
    }
}


export const getUserInfo = (opts) => {
    return dispatch => {
        axiosData('./api/userInfo', opts)
            .then(res => {
                const { data = {} } = res
                dispatch(lodUserInfo(data))
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


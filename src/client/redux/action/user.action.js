import Axios from "axios";

export const LOGIN_SUCCESS = 'login success'
export const LOGOUT = 'logout'

export const login = (opts) => {
    return dispatch => {
        Axios.post('./api/user', opts).then(res => {
            console.log(res.data)
            if (res.data.code = '000') {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data.data,
                })
            }
        })
    }
}


export const logOut = () => {
    return dispatch => {
        dispatch({
            type: LOGOUT,
            // payload: res.data.data,
        })
    }
}
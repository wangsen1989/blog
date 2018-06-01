import axiosData from "../../utils/axiosData";

export const CHANGE_MY_LIST_VISIBLE = 'change my list visible'
export const ADD_RECORD = 'add record'


export const changeMyListVisible = (opts) => {
    return dispatch => {
        dispatch({
            type: CHANGE_MY_LIST_VISIBLE,
            payload: opts,
        })
    }
}


export const addRecord = (opts) => {
    return dispatch => {
        return axiosData('/api/addRecord', opts)
            .then(res => {
                console.log(res)
                return Promise.resolve()
            })
            .catch(err => Promise.reject())
    }
}


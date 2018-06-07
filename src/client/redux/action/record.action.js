import axiosData from "../../utils/axiosData";
import { Toast } from 'antd-mobile';

export const CHANGE_MY_LIST_VISIBLE = 'change my list visible'
export const ADD_RECORD = 'add record'
export const RECORDING_ARTICLE = 'recording article'

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
        const { title, content } = opts
        if (!title || !content) {
            Toast.fail('执行失败，请检查填写是否合法', 1);
            return Promise.reject()
        }
        return axiosData('/api/addRecord', opts)
            .then(res => {
                return Promise.resolve(res)
            })
            .catch(err => {
                return Promise.reject(err)
            })
    }
}
export const recordingArticle = (opts) => ({
    type: RECORDING_ARTICLE,
    payload: opts
})


export const getArticleDetail = (artId) => {
    return (dispatch, getState) => {
        axiosData('/api/articleDetail', { artId })
            .then(res => {
                const { title, content, _id } = res.data
                dispatch(recordingArticle({ title, content, _id }))
            })
            .catch(err => console.log(err))
    }
}

export const deleteRecord = (opts) => {
    return (dispatch, getState) => {
        return axiosData('/api/deleteRecord', opts)
            .then(res => Promise.resolve(res))
            .catch(err => Promise.reject(err))
    }
}

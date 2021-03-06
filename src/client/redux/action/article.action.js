import axiosData from "../../utils/axiosData";
import { Toast } from 'antd-mobile';

export const GET_ARTICLES = "get articles"
export const CHANGE_ART_MODAL = "change art modal"
export const STORE_COMMENT = "store comment"

const getArticles = (pageNo, pageSize = 10) => {
    return (dispatch, getState) => {
        return axiosData('/api/article', { pageNo, pageSize })
            .then(res => {
                const preRender = getState().articleReducer.get('$$articles').toJS();
                let nextRender = []
                if (pageNo === 0) {
                    nextRender = res.data
                } else {
                    if (preRender.length <= 1000) {
                        nextRender = [...preRender, ...res.data]
                    } else {
                        nextRender = [...preRender.slice(10), ...res.data]
                    }
                }
                dispatch({
                    type: GET_ARTICLES,
                    payload: { nextRender, noMore: res.data.length === 0 },
                })
                return Promise.resolve()
            })
            .catch(err => Promise.resolve())
    }
}

const changeArtModal = (visible, artId) => {
    return (dispatch, getState) => {
        if (visible) {
            axiosData('/api/articleDetail', { artId })
                .then(res => {
                    dispatch({
                        type: CHANGE_ART_MODAL,
                        payload: { modalVisible: true, articleDetail: res.data },
                    })
                })
                .catch(err => console.log(err))
        }
        else {
            dispatch({
                type: CHANGE_ART_MODAL,
                payload: { modalVisible: false, articleDetail: {} },
            })
        }
    }
}

const storeComment = (comment) => ({
    type: STORE_COMMENT,
    payload: comment,
})

const submitComment = (opts) => {
    return dispatch => {
        const { comment } = opts
        if (!comment) {
            Toast.fail('执行失败，请检查填写是否合法', 1);
            return Promise.resolve()
        }
        return axiosData('/api/submitComment', opts)
            .then(res => Promise.resolve(res))
            .catch(err => Promise.resolve())

    }
}

export {
    getArticles,
    changeArtModal,
    storeComment,
    submitComment,
}
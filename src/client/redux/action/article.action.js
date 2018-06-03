import axiosData from "../../utils/axiosData";

export const GET_ARTICLES = "get articles"
export const CHANGE_ART_MODAL = "change art modal"

const getArticles = (pageNo, pageSize = 10) => {
    return (dispatch, getState) => {
        axiosData('/api/article', { pageNo, pageSize })
            .then(res => {
                const preRender = getState().articleReducer.get('$$articles').toJS();
                let nextRender = []
                if (preRender.length <= 1000) {
                    nextRender = [...preRender, ...res.data]
                } else {
                    nextRender = [...preRender.slice(10), ...res.data]
                }
                dispatch({
                    type: GET_ARTICLES,
                    payload: { nextRender, noMore: res.data.length === 0 },
                })
            })
            .catch(err => console.log(err))
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
        else{
            dispatch({
                type: CHANGE_ART_MODAL,
                payload: { modalVisible: false, articleDetail: {} },
            })
        }
    }
}

export {
    getArticles,
    changeArtModal,
}
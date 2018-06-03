import axiosData from "../../utils/axiosData";

export const GET_ARTICLES = "get articles"

const getArticles = (pageNo, pageSize = 10) => {
    return (dispatch, getState) => {
        axiosData('/api/article', { pageNo, pageSize })
            .then(res => {
                const preRender = getState().articleReducer.get('articles').toJS();
                let nextRender = []
                if (preRender.length <= 20) {
                    nextRender = [...preRender, ...res.data]
                }else{
                    nextRender= [...preRender.slice(10), ...res.data]
                }
                debugger
                dispatch({
                    type: GET_ARTICLES,
                    payload: nextRender,
                })
            })
            .catch(err => console.log(err))
    }
}

export {
    getArticles,
}
import axiosData from "../../utils/axiosData";

export const GET_ARTICLES = "get articles"

const getArticles = (pageNo) => {
    return dispatch => {
        axiosData('/api/article', { pageNo })
            .then(res => {
                dispatch({
                    type: GET_ARTICLES,
                    payload: res.data,
                })
            })
            .catch(err => console.log(err))
    }
}

export {
    getArticles,
}
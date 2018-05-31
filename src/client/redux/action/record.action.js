import axiosData from "../../utils/axiosData";

export const CHANGE_MY_LIST_VISIBLE = 'change my list visible'


export const changeMyListVisible = (opts) => {
    return dispatch => {
        dispatch({
            type: CHANGE_MY_LIST_VISIBLE,
            payload:opts,
        })
    }
}


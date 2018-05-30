import axios from "axios"

export const DEMO_ACTION = "demo action"

const demoAction = (opts) => {
    return dispatch => {
        axios.post('/api/list', {
            name: opts.name
        })
            .then(res => {
                dispatch({
                    type: DEMO_ACTION,
                    payload: res.data,
                })
            })
            .catch(err => console.log(err))
    }
}

export {
    demoAction,
}
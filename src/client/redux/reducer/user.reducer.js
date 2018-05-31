import Immutable from 'immutable'
import { LOAD_USER_INFO, LOGOUT } from '../action/user.action'

const $$initialState = Immutable.fromJS({
    loginStatus: false,
    userInfo: {
        name: '',
        record: []
    }
})


const userReducer = ($$state = $$initialState, action) => {

    switch (action.type) {

        case LOAD_USER_INFO:
            return $$state.set('loginStatus', true).mergeIn(['userInfo'], action.payload)

        case LOGOUT:
            return $$initialState

        default:
            return $$state

    }
}

export {
    userReducer,
}
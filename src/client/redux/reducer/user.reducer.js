import Immutable from 'immutable'
import { LOGIN_SUCCESS } from '../action/user.action'

const $$initialState = Immutable.fromJS({
    loginStatus: false
})


const userReducer = ($$state = $$initialState, action) => {

    switch (action.type) {

        case LOGIN_SUCCESS:
            return $$state.set('loginStatus', action.payload)

        default:
            return $$state

    }
}

export {
    userReducer,
}
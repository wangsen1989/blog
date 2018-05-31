import Immutable from 'immutable'
import { CHANGE_MY_LIST_VISIBLE } from '../action/record.action'

const $$initialState = Immutable.fromJS({
    listVisibel: true,
})


const recordReducer = ($$state = $$initialState, action) => {

    switch (action.type) {

        case CHANGE_MY_LIST_VISIBLE:
            return $$state.set('listVisibel', action.payload)

        default:
            return $$state

    }
}

export {
    recordReducer,
}
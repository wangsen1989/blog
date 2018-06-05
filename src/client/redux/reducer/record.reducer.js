import Immutable from 'immutable'
import { CHANGE_MY_LIST_VISIBLE, RECORDING_ARTICLE } from '../action/record.action'

const $$initialState = Immutable.fromJS({
    listVisibel: true,
    storedArticle: {
        _id:'',
        title: '',
        content: ''
    }
})


const recordReducer = ($$state = $$initialState, action) => {

    switch (action.type) {

        case CHANGE_MY_LIST_VISIBLE:
            return $$state.set('listVisibel', action.payload)

        case RECORDING_ARTICLE:
            return $$state.mergeIn(['storedArticle'], action.payload)

        default:
            return $$state

    }
}

export {
    recordReducer,
}
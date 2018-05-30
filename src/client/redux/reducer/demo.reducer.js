import Immutable from 'immutable'
import { DEMO_ACTION } from '../action/demo.action.js'

const $$initialState = Immutable.fromJS({
    list: ['demo']
})

// const initialState = {
//     list: ['demo']
// }

const demoReducer = ($$state = $$initialState, action) => {

    switch (action.type) {

        case DEMO_ACTION:
            return $$state.setIn(['list'], Immutable.fromJS(action.payload))

        // case DEMO_ACTION2:
        //     return {...initialState}

        default:
            return $$state

    }
}

export {
    demoReducer,
}
import Immutable from 'immutable'
import { GET_ARTICLES } from '../action/article.action'

const $$initialState = Immutable.fromJS({
    articles: []
})

const articleReducer = ($$state = $$initialState, action) => {

    switch (action.type) {

        case GET_ARTICLES:
            return $$state.setIn(['articles'], Immutable.fromJS(action.payload))


        default:
            return $$state

    }
}

export {
    articleReducer,
}
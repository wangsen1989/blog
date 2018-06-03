import Immutable from 'immutable'
import { GET_ARTICLES, CHANGE_ART_MODAL } from '../action/article.action'

const $$initialState = Immutable.fromJS({
    $$articles: [],
    noMore: false,
    $$articleDetail: {},
    modalVisible: false,
})

const articleReducer = ($$state = $$initialState, action) => {

    switch (action.type) {

        case GET_ARTICLES:
            return $$state.setIn(['$$articles'], Immutable.fromJS(action.payload.nextRender))
                .setIn(['noMore'], action.payload.noMore)

        case CHANGE_ART_MODAL:
            return $$state.setIn(['$$articleDetail'], Immutable.fromJS(action.payload.articleDetail))
                .setIn(['modalVisible'], action.payload.modalVisible)

        default:
            return $$state

    }
}

export {
    articleReducer,
}
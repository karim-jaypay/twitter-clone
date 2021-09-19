/* eslint-disable import/no-anonymous-default-export */
import { CREATE_TWEET, CREATE_TWEET_ERROR, CREATE_TWEET_SUCCESS } from '../actions'

const initialState = {
    data: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TWEET:
            return  {
                ...state,
            }
        case CREATE_TWEET_SUCCESS:
        return  {
            ...state, message: action.payload
        }
        case CREATE_TWEET_ERROR:
        return  {
            ...state, message: action.payload
        }
        default:
            return state;
    }
}
/* eslint-disable import/no-anonymous-default-export */
import { CREATE_TWEET, 
    CREATE_TWEET_ERROR, 
    CREATE_TWEET_SUCCESS, 
    GET_TWEETS, 
    GET_TWEETS_ERROR, 
    GET_TWEETS_SUCCESS, 
    LIKE_TWEET,
    LIKE_TWEET_SUCCESS,
    LIKE_TWEET_ERROR } from '../actions'

const initialState = {
    data: '',
    tweets: '',
    message: ''
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
        case GET_TWEETS:
        return  {
            ...state,
        }
        case GET_TWEETS_SUCCESS:
        return  {
            ...state, tweets: action.payload
        }
        case GET_TWEETS_ERROR:
        return  {
            ...state, message: action.payload
        }

        case LIKE_TWEET:
        return  {
            ...state,
        }
        case LIKE_TWEET_SUCCESS:
        return  {
            ...state, message: action.payload
        }
        case LIKE_TWEET_ERROR:
        return  {
            ...state, message: action.payload
        }
        default:
            return state;
    }
}
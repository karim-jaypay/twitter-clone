

/* AUTH */
export const LOGIN_USER = 'LOGIN_USER'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR'

export const REGISTER_USER = 'REGISTER_USER'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR'

/* TWEETS ACTIONS */
export const CREATE_TWEET = 'CREATE_TWEET'
export const CREATE_TWEET_SUCCESS = 'CREATE_TWEET_SUCCESS'
export const CREATE_TWEET_ERROR = 'CREATE_TWEET_ERROR'

export const GET_TWEETS = 'GET_TWEETS'
export const GET_TWEETS_SUCCESS = 'GET_TWEETS_SUCCESS'
export const GET_TWEETS_ERROR = 'GET_TWEETS_ERROR'

export const LIKE_TWEET = 'LIKE_TWEET'
export const LIKE_TWEET_SUCCESS = 'LIKE_TWEET_SUCCESS'
export const LIKE_TWEET_ERROR = 'LIKE_TWEET_ERROR'

export * from './auth/actions';
export * from './tweet/actions';
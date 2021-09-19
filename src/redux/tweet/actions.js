import {
    CREATE_TWEET,
    CREATE_TWEET_SUCCESS,
    CREATE_TWEET_ERROR
  } from '../actions';

  /* TWEET ACTIONS */
  
  export const createTweet = (data) => ({
    type: CREATE_TWEET,
    payload: data
  });
  export const createTweetSuccess = (data) => ({
    type: CREATE_TWEET_SUCCESS,
    payload: data
  });
  export const createTweetError = (data) => ({
    type: CREATE_TWEET_ERROR,
    payload: data
  });

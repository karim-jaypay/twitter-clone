import {
    CREATE_TWEET,
    CREATE_TWEET_SUCCESS,
    CREATE_TWEET_ERROR,
    GET_TWEETS,
    GET_TWEETS_SUCCESS,
    GET_TWEETS_ERROR
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

  export const gettweets = (userid) => ({
    type: GET_TWEETS,
    payload: userid
  });
  export const gettweetsSuccess = (tweets) => ({
    type: GET_TWEETS_SUCCESS,
    payload: tweets
  });
  export const gettweetsError = (message) => ({
    type: GET_TWEETS_ERROR,
    payload: message
  });

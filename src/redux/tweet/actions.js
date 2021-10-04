import {
    CREATE_TWEET,
    CREATE_TWEET_SUCCESS,
    CREATE_TWEET_ERROR,
    GET_TWEETS,
    GET_TWEETS_SUCCESS,
    GET_TWEETS_ERROR,
    LIKE_TWEET,
    LIKE_TWEET_SUCCESS,
    LIKE_TWEET_ERROR
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

  export const liketweet = (tweet_id, user_id) => ({
    type: LIKE_TWEET,
    payload: tweet_id, user_id
  });
  export const liketweetSuccess = (tweets) => ({
    type: LIKE_TWEET_SUCCESS,
    payload: tweets
  });
  export const liketweetError = (message) => ({
    type: LIKE_TWEET_ERROR,
    payload: message
  });

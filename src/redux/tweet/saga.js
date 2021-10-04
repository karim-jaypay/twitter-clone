import { call, put, takeLatest, all, } from "redux-saga/effects"

import { CREATE_TWEET, GET_TWEETS, LIKE_TWEET } from "../actions"

import { createTweet, 
  createTweetSuccess, 
  createTweetError, 
  gettweetsSuccess, 
  gettweetsError, 
  liketweet,
  liketweetSuccess,
  liketweetError } from './actions'

import axios from 'axios'
import moment from 'moment'
import { getLocalStorage } from "../../storage"

axios.defaults.withCredentials = true

/* CREATE TWEET */

const TweetAsync = async (user_id, text) =>
await axios.post("http://localhost:5000/tweets/create", { user_id, text }, 
{
  headers: {
  'Authorization': `Bearer ${getLocalStorage('ui').token}`
  }
})
.then((res) => res.data)
.catch((error) => error.response.data);

function* create({ payload }) {
  const { user_id, text, history, changeLoader } = payload;
  try {
    const tweet = yield call(TweetAsync, user_id, text);
    if (!tweet.message) {
      yield put(createTweetSuccess('success'));

    } else {
      yield put(createTweetError(tweet.message));
    }  
    changeLoader(false)
  } catch (error) {
     yield put(createTweetError(error));
  }
}

/* GET ALL TWEETS */

const getAllTweetsAsync = async (user_id) =>
await axios.post("http://localhost:5000/tweets/getalltweets", { user_id, withCredentials: true }, 
{
  headers: {
    'Authorization': `Bearer ${getLocalStorage('ui').token}` 
}})
.then((res) => res.data)
.catch((error) => error.response.data);

function* getTweets({ payload }) {
  const { user_id } = payload;
  try {
    const tweet = yield call(getAllTweetsAsync, user_id);
    if (!tweet.message) {
      yield put(gettweetsSuccess(tweet));

    } else {
      yield put(gettweetsError(tweet.message));
    }  
  } catch (error) {
     yield put(gettweetsError(error));
  }
}

/* LIKE TWEET */
const LikeTweetAsync = async (tweet_id, user_id) =>
await axios.post("http://localhost:5000/tweets/like-tweet", { tweet_id, user_id }, 
{
  headers: {
  'Authorization': `Bearer ${getLocalStorage('ui').token}`
  }
})
.then((res) => res.data)
.catch((error) => error.response.data);

function* liketweetfunction({ payload }) {
  const { tweet_id, user_id } = payload;
  try {
    const like = yield call(LikeTweetAsync, tweet_id, user_id);
    if (!like.message) {
      yield put(liketweetSuccess('success'));

    } else {
      yield put(liketweetError(like.message));
    }  
  } catch (error) {
     yield put(liketweetError(error));
  }
}

export default function* tweetSaga() {
  yield all ([
    takeLatest(CREATE_TWEET, create),
    takeLatest(GET_TWEETS, getTweets),
    takeLatest(LIKE_TWEET, liketweetfunction)
  ])
}
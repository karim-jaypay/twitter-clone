import { call, put, takeLatest, all, } from "redux-saga/effects"

import { CREATE_TWEET } from "../actions"

import { createTweet, createTweetSuccess, createTweetError} from './actions'

import axios from 'axios'
import moment from 'moment'

axios.defaults.withCredentials = true

/* TWEET */

  const TweetAsync = async (user_id, text) =>
  await axios.post("http://localhost:5000/tweets/create", { user_id, text })
    .then((res) => res.data)
    .catch((error) => error.response.data);

function* create({ payload }) {
  const { user_id, text, history, changeLoader } = payload;
  try {
    const tweet = yield call(TweetAsync, user_id, text);
    if (!tweet.message) {
      yield put(createTweetSuccess('success'));
      history.go(0)

    } else {
      yield put(createTweetError(tweet.message));
    }  
    changeLoader(false)
  } catch (error) {
     yield put(createTweetError(error));
  }
}


export default function* tweetSaga() {
  yield all ([
    takeLatest(CREATE_TWEET, create),
    /* takeLatest(REGISTER_USER, register) */
  ])
}
import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import tweetSaga from './tweet/saga'


export default function* rootSaga() {
  yield all([ authSaga(), tweetSaga()]);
}
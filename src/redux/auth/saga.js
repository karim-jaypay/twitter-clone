import axios from 'axios'
import moment from 'moment'

import { call, put, takeLatest, all, } from "redux-saga/effects"

import { LOGIN_USER, REGISTER_USER } from "../actions"

import { loginUserSuccess, loginUserError, registerUserSuccess, registerUserError} from './actions'

/* LOGIN */


  const loginWithEmailPasswordAsync = async (email, password) =>
  await axios.post("http://localhost:5000/register/login", { email, password, withCredentials: true })
    .then((res) => res.data)
    .catch((error) => error.response.data);

function* loginWithEmailPassword({ payload }) {
  const { email, password, history } = payload;
  try {
    const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
    if (!loginUser.message) {
      localStorage.setItem( 'ui', loginUser.data );
      yield put(loginUserSuccess('success'));
      history.go(0)

    } else {
      yield put(loginUserError(loginUser.message));
    }  
  } catch (error) {
     yield put(loginUserError(error));
  }
}

/* REGISTER */

const registerAsync = async (data) => {
  const month = moment().month(data.month).format("MM");
  return await axios.post("http://localhost:5000/register/create", { name: data.name, email: data.email, birth: data.day+"/"+month+"/"+data.year })
    .then((res) => res.data)
    .catch((error) => error.response.data);
}

function* register({ payload }) {
const data = payload;
try {
    const register =  yield call(registerAsync, data);
    if(!register.error) {
      yield all([yield put(registerUserSuccess(register)), yield put(registerUserError('')) ])
      
    } else yield put(registerUserError(register.error))

} catch (error) {
   yield put(registerUserError(error));
}
}


export default function* authSaga() {
  yield all ([
    takeLatest(LOGIN_USER, loginWithEmailPassword),
    takeLatest(REGISTER_USER, register)
  ])
}
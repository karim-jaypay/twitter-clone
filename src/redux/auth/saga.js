import moment from "moment";

import { call, put, takeLatest, all } from "redux-saga/effects";

import { LOGIN_USER, REGISTER_USER_FIRST_STEP } from "../actions";

import {
  loginUserSuccess,
  loginUserError,
  registerUserFirstStep,
  registerUserFirstStepError,
} from "./actions";
import ClientAPI from "../../Services/axios";

/* LOGIN */

const loginWithEmailPasswordAsync = async (email, password) =>
  await ClientAPI.post("register/login", {
    email,
    password,
    withCredentials: true,
  })
    .then((res) => res.data)
    .catch((error) => error.response.data);

function* loginWithEmailPassword({ payload }) {
  const { email, password, history } = payload;
  try {
    const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
    if (!loginUser.message) {
      localStorage.setItem("ui", loginUser.data);
      yield put(loginUserSuccess("success"));
      history.go(0);
    } else {
      yield put(loginUserError(loginUser.message));
    }
  } catch (error) {
    yield put(loginUserError(error));
  }
}

/* REGISTER */

const registerAsync = async (info) => {
  const month = moment().month(info.month).format("MM");
  return await ClientAPI.post("register/create", {
    name: info.name,
    email: info.email,
    birth: info.year + "/" + month + "/" + info.day,
  });
};

function* registerFirstStep({ payload }) {
  const data = payload;
  try {
    const register = yield call(registerAsync, data);
    if (!register.error) {
      yield put(registerUserFirstStep(register.data));
    } else yield put(registerUserFirstStepError(register.error));
  } catch (error) {
    yield yield put(registerUserFirstStepError(error));
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(LOGIN_USER, loginWithEmailPassword),
    takeLatest(REGISTER_USER_FIRST_STEP, registerFirstStep),
  ]);
}

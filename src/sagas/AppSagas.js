import { put, call, delay, takeEvery } from 'redux-saga/effects';
import { APP, MESSAGE, USER } from '../actions/ActionTypes';
import { initializeCompleted } from '../actions/AppActions';
import { busy, busyCompleted } from '../actions/UIActions';
import { popupMessage, dismissMessage } from '../actions/MessageActions';
import { loginFailed, loginCompleted, logoutCompleted } from '../actions/UserActions';
import { login } from '../apis/app';
import { LOCALSTORAGE_KEY_FOR_CREDENTIAL } from '../constants';

function* handleInitialize() {
  try {
    yield put(busy());
    yield call(login, { username: 'awkae-function', password: 'awkae-function' });
    yield put(initializeCompleted());
    yield put(busyCompleted());
  } catch (e) {
    yield put(
      popupMessage({
        content: 'Failed to initialize the app',
      })
    );
    yield put(busyCompleted());
  }
}

function* handleUserLogin(action) {
  try {
    yield put(busy());
    const { username, password } = action.payload;
    const results = yield call(login, { username, password });
    if (results.data.success) {
      localStorage.setItem(
        LOCALSTORAGE_KEY_FOR_CREDENTIAL,
        JSON.stringify({
          username,
          expiry: +new Date(new Date().valueOf() + 1000 * 3600 * 24 * 2),
        })
      );
      yield put(loginCompleted());
    } else {
      yield put(
        loginFailed({
          message: 'Failed to login',
        })
      );
      yield put(
        popupMessage({
          content: '登录失败',
        })
      );
    }
    yield put(busyCompleted());
  } catch (e) {
    yield put(
      popupMessage({
        content: 'Failed to log in',
      })
    );
    yield put(busyCompleted());
  }
}

function* handleUserLogout() {
  try {
    yield put(busy());
    localStorage.removeItem(LOCALSTORAGE_KEY_FOR_CREDENTIAL);
    yield put(logoutCompleted());
    yield put(busyCompleted());
  } catch (e) {
    yield put(busyCompleted());
  }
}

function* handleNotify() {
  yield delay(5000);
  yield put(dismissMessage());
}

export default function* root() {
  yield takeEvery(APP.INITIALIZE, handleInitialize);
  yield takeEvery(MESSAGE.POPUP_MESSAGE, handleNotify);
  yield takeEvery(USER.LOGIN, handleUserLogin);
  yield takeEvery(USER.LOGOUT, handleUserLogout);
}

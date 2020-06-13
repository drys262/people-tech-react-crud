import { all, takeLatest, call, put } from 'redux-saga/effects';
import { LOGIN_USER } from './constants';
import { loginFailed, loginSuccess } from './actions';
import { loginUserWithEmailAndPassword } from './api';

function* loginToFirebaseAuth(action) {
  //
  const { username, password } = action;
  try {
    const userCredentials = yield call(
      loginUserWithEmailAndPassword,
      username,
      password,
    );
    yield put(loginSuccess(userCredentials.user));
  } catch (error) {
    yield put(loginFailed(error));
  }
}

function* loginUser() {
  yield takeLatest(LOGIN_USER, loginToFirebaseAuth);
}

// Individual exports for testing
export default function* loginPageSaga() {
  // See example in containers/HomePage/saga.js

  yield all([loginUser()]);
}

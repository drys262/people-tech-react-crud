import { all, takeLatest, call, put } from 'redux-saga/effects';
import { LOGIN_USER } from './constants';
import { loginSuccess } from './actions';
import { showError } from '../App/actions';
import { loginUserWithEmailAndPassword } from './api';

function* loginToFirebaseAuth(action) {
  const { username, password } = action;
  try {
    const userCredentials = yield call(
      loginUserWithEmailAndPassword,
      username,
      password,
    );
    yield put(loginSuccess(userCredentials.user));
  } catch (error) {
    yield put(showError(error.message));
  }
}

function* loginUser() {
  yield takeLatest(LOGIN_USER, loginToFirebaseAuth);
}

export default function* loginPageSaga() {
  yield all([loginUser()]);
}

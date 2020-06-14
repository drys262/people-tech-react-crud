import { takeLatest, call, put, all } from 'redux-saga/effects';
import { SIGN_UP_USER } from './constants';
import { signUpUserWithEmailAndPassword } from './api';
import { showError } from '../App/actions';
import { signUpSuccess } from './actions';

function* signUpToFirebaseAuth(action) {
  const { username, password } = action;
  try {
    const userCredentials = yield call(
      signUpUserWithEmailAndPassword,
      username,
      password,
    );
    yield put(signUpSuccess(userCredentials.user));
  } catch (error) {
    yield put(showError(error.message));
  }
}

function* signUpUser() {
  yield takeLatest(SIGN_UP_USER, signUpToFirebaseAuth);
}

export default function* signUpPageSaga() {
  yield all([signUpUser()]);
}

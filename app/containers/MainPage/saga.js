import { all, takeLatest, call, put } from 'redux-saga/effects';
import { LOAD_PEOPLE } from './constants';
import { getPeopleFromDB } from './api';
import { loadPeopleFailed, loadPeopleSuccess } from './actions';

function* fetchPeople(action) {
  try {
    const data = yield call(getPeopleFromDB, action.userId);
    yield put(loadPeopleSuccess(data));
  } catch (error) {
    yield put(loadPeopleFailed(error));
  }
}

function* loadPeople() {
  yield takeLatest(LOAD_PEOPLE, fetchPeople);
}

// Individual exports for testing
export default function* mainPageSaga() {
  // See example in containers/HomePage/saga.js

  yield all([loadPeople()]);
}

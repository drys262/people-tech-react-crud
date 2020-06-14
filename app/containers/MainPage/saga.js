import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_PEOPLE, LOAD_REPOS } from './constants';
import { getPeopleFromDB } from './api';
import {
  loadPeopleFailed,
  loadPeopleSuccess,
  repoLoadingError,
  reposLoaded,
} from './actions';
import { showError } from '../App/actions';
import { makeSelectSelectedDev } from './selectors';

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

export function* getRepos() {
  const selectedDev = yield select(makeSelectSelectedDev());
  const requestURL = `https://api.github.com/users/${
    selectedDev.githubHandle
  }/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    console.log('respos here saga', repos);
    yield put(reposLoaded(repos));
  } catch (error) {
    yield put(repoLoadingError(error));
    yield put(showError('GitHub handle not found.'));
  }
}

function* loadRepos() {
  yield takeLatest(LOAD_REPOS, getRepos);
}

export default function* mainPageSaga() {
  yield all([loadPeople(), loadRepos()]);
}

import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_PEOPLE, LOAD_REPOS, FILTER_DATA } from './constants';
import { getPeopleFromDB, filterData } from './api';
import {
  loadPeopleFailed,
  loadPeopleSuccess,
  repoLoadingError,
  reposLoaded,
  filterReposSuccess,
} from './actions';
import { showError } from '../App/actions';
import { makeSelectSelectedDev, makeSelectToggleFilter } from './selectors';

function* fetchPeople(action) {
  try {
    const data = yield call(getPeopleFromDB, action.userId);
    yield put(loadPeopleSuccess(data));
  } catch (error) {
    yield put(loadPeopleFailed(error));
  }
}

function* fetchRepos() {
  const selectedDev = yield select(makeSelectSelectedDev());
  const requestURL = `https://api.github.com/users/${
    selectedDev.githubHandle
  }/repos?type=all&sort=updated`;

  try {
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos));
  } catch (error) {
    yield put(repoLoadingError(error));
    yield put(showError('GitHub handle not found.'));
  }
}

function* fetchFilterData(action) {
  const filter = yield select(makeSelectToggleFilter());
  try {
    const people = yield call(filterData, {
      filter,
      userId: action.userId,
    });
    yield put(filterReposSuccess(people.data));
  } catch (error) {
    yield put(showError());
  }
}

function* loadRepos() {
  yield takeLatest(LOAD_REPOS, fetchRepos);
}

function* loadPeople() {
  yield takeLatest(LOAD_PEOPLE, fetchPeople);
}

function* loadFilterData() {
  yield takeLatest(FILTER_DATA, fetchFilterData);
}

export default function* mainPageSaga() {
  yield all([loadPeople(), loadRepos(), loadFilterData()]);
}

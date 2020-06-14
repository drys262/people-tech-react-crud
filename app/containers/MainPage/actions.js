/*
 *
 * MainPage actions
 *
 */

import {
  LOAD_PEOPLE,
  LOAD_PEOPLE_FAILED,
  LOAD_PEOPLE_SUCCESS,
  UPDATE_SEARCH_TERM,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  LOAD_REPOS_SUCCESS,
  SELECT_DEV,
} from './constants';

export function loadPeople(userId) {
  return {
    type: LOAD_PEOPLE,
    userId,
  };
}

export function loadPeopleSuccess(people) {
  return {
    type: LOAD_PEOPLE_SUCCESS,
    people,
  };
}

export function loadPeopleFailed(error) {
  return {
    type: LOAD_PEOPLE_FAILED,
    error,
  };
}

export function updateSearchTerm(searchTerm) {
  return {
    type: UPDATE_SEARCH_TERM,
    searchTerm,
  };
}

export function selectDev(selectedDev) {
  return {
    type: SELECT_DEV,
    selectedDev,
  };
}

export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

export function reposLoaded(repos) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
  };
}

export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}

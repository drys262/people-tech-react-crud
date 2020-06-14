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

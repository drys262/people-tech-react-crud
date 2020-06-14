/*
 *
 * MainPage reducer
 *
 */
import produce from 'immer';
import {
  LOAD_PEOPLE_SUCCESS,
  UPDATE_SEARCH_TERM,
  LOAD_PEOPLE,
  LOAD_PEOPLE_FAILED,
  SELECT_DEV,
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
} from './constants';

export const initialState = {
  people: [],
  searchTerm: '',
  isFetchingPeople: false,
  selectedDev: {},
  selectedDevRepo: [],
  loadingRepos: false,
  errorMessage: '',
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const mainPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_PEOPLE:
        draft.isFetchingPeople = true;
        break;
      case LOAD_PEOPLE_SUCCESS:
        draft.people = action.people;
        draft.isFetchingPeople = false;
        break;
      case LOAD_PEOPLE_FAILED:
        draft.isFetchingPeople = false;
        break;
      case UPDATE_SEARCH_TERM:
        draft.searchTerm = action.searchTerm;
        break;
      case SELECT_DEV:
        draft.selectedDev = action.selectedDev;
        break;
      case LOAD_REPOS:
        draft.loadingRepos = true;
        draft.repositories = [];
        draft.error = false;
        break;
      case LOAD_REPOS_SUCCESS:
        draft.selectedDevRepo = action.repos;
        draft.loadingRepos = false;
        draft.error = false;
        break;
      case LOAD_REPOS_ERROR:
        draft.errorMessage = action.error;
        draft.loadingRepos = false;
        draft.error = true;
        break;
    }
  });

export default mainPageReducer;

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
} from './constants';

export const initialState = {
  people: [],
  searchTerm: '',
  isFetchingPeople: false,
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
    }
  });

export default mainPageReducer;

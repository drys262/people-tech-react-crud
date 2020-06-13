/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { CHANGE_PASSWORD, CHANGE_USERNAME } from './constants';

export const initialState = {
  username: '',
  password: '',
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_PASSWORD:
        draft.password = action.password;
        break;
      case CHANGE_USERNAME:
        draft.username = action.username;
        break;
    }
  });

export default loginPageReducer;

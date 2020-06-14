/*
 *
 * SignUpPage actions
 *
 */

import {
  CHANGE_PASSWORD,
  CHANGE_USERNAME,
  SIGN_UP_FAILED,
  SIGN_UP_USER,
  SIGN_UP_SUCCESS,
} from './constants';

export function signUpUser(username, password) {
  return {
    type: SIGN_UP_USER,
    username,
    password,
  };
}
export function signUpSuccess(user) {
  return {
    type: SIGN_UP_SUCCESS,
    user,
  };
}
export function signUpFailed(error) {
  return {
    type: SIGN_UP_FAILED,
    error,
  };
}

export function changeUsername(username) {
  return {
    type: CHANGE_USERNAME,
    username,
  };
}

export function changePassword(password) {
  return {
    type: CHANGE_PASSWORD,
    password,
  };
}

/*
 *
 * LoginPage actions
 *
 */

import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_USER,
  CHANGE_PASSWORD,
  CHANGE_USERNAME,
} from './constants';

/**
 * Login the user to Firebase Authentication, this action starts the request saga
 *
 * @return {object} An action object with a type of LOGIN_USER
 */
export function loginUser(username, password) {
  return {
    type: LOGIN_USER,
    username,
    password,
  };
}

/**
 * Dispatched when the logging in to Firebase Auth is successful
 *
 * @param  {object} user The Firebase User data
 *
 * @return {object}      An action object with a type of LOGIN_SUCCESS passing the user
 */
export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

/**
 * Dispatched when logging in the Firebase Auth fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOGIN_FAILED passing the error
 */
export function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
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

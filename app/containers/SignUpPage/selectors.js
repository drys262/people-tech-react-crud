import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the signUpPage state domain
 */

const selectSignUpPageDomain = state => state.signUpPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SignUpPage
 */

const makeSelectSignUpPage = () =>
  createSelector(
    selectSignUpPageDomain,
    substate => substate,
  );

const makeSelectUsername = () =>
  createSelector(
    selectSignUpPageDomain,
    substate => substate.username,
  );

const makeSelectPassword = () =>
  createSelector(
    selectSignUpPageDomain,
    substate => substate.password,
  );

export default makeSelectSignUpPage;
export { selectSignUpPageDomain, makeSelectUsername, makeSelectPassword };

import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectLoginPageDomain = state => state.loginPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginPage
 */

const makeSelectLoginPage = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate,
  );

const makeSelectUsername = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate.username,
  );

const makeSelectPassword = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate.password,
  );

export default makeSelectLoginPage;
export { selectLoginPageDomain, makeSelectUsername, makeSelectPassword };

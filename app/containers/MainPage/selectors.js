import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mainPage state domain
 */

const selectMainPageDomain = state => state.mainPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MainPage
 */

const makeSelectMainPage = () =>
  createSelector(
    selectMainPageDomain,
    substate => substate,
  );

const makeSelectPeople = () =>
  createSelector(
    selectMainPageDomain,
    substate => substate.people,
  );

const makeSelectIsFetchingPeople = () =>
  createSelector(
    selectMainPageDomain,
    substate => substate.isFetchingPeople,
  );

export default makeSelectMainPage;
export { selectMainPageDomain, makeSelectPeople, makeSelectIsFetchingPeople };

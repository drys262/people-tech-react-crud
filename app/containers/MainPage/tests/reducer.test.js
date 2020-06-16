// import produce from 'immer';
import mainPageReducer from '../reducer';
import {
  toggleFilter,
  loadPeople,
  loadPeopleFailed,
  loadPeopleSuccess,
} from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('mainPageReducer', () => {
  it('returns the initial state', () => {
    expect(mainPageReducer(undefined, {})).toMatchSnapshot();
  });

  it('handles the toggleFilter', () => {
    expect(mainPageReducer({}, toggleFilter())).toMatchSnapshot();
  });

  it('handles the loadPeople', () => {
    expect(mainPageReducer({}, loadPeople(1))).toMatchSnapshot();
  });
  it('handles the loadPeopleFailed', () => {
    expect(
      mainPageReducer({}, loadPeopleFailed('error message')),
    ).toMatchSnapshot();
  });
  it('handles the loadPeopleSuccess', () => {
    expect(mainPageReducer({}, loadPeopleSuccess([]))).toMatchSnapshot();
  });
});

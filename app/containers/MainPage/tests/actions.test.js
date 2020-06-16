import {
  loadPeople,
  loadPeopleFailed,
  loadPeopleSuccess,
  loadRepos,
  repoLoadingError,
  reposLoaded,
  setPeople,
  selectDev,
  filterData,
  filterReposError,
  filterReposSuccess,
  toggleFilter,
  updateSearchTerm,
} from '../actions';
import {
  LOAD_PEOPLE,
  LOAD_PEOPLE_FAILED,
  LOAD_PEOPLE_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  LOAD_REPOS_SUCCESS,
  FILTER_DATA,
  FILTER_DATA_ERROR,
  FILTER_DATA_SUCCESS,
  SELECT_DEV,
  SET_PEOPLE,
  UPDATE_SEARCH_TERM,
  TOGGLE_FILTER,
} from '../constants';

describe('MainPage actions', () => {
  it('loadPeople', () => {
    expect(loadPeople()).toHaveProperty('type', LOAD_PEOPLE);
  });
  it('loadPeopleSuccess', () => {
    expect(loadPeopleSuccess()).toHaveProperty('type', LOAD_PEOPLE_SUCCESS);
  });
  it('loadPeopleFailed', () => {
    expect(loadPeopleFailed()).toHaveProperty('type', LOAD_PEOPLE_FAILED);
  });
  it('updateSearchTerm', () => {
    expect(updateSearchTerm()).toHaveProperty('type', UPDATE_SEARCH_TERM);
  });
  it('selectDev', () => {
    expect(selectDev()).toHaveProperty('type', SELECT_DEV);
  });
  it('loadRepos', () => {
    expect(loadRepos()).toHaveProperty('type', LOAD_REPOS);
  });
  it('reposLoaded', () => {
    expect(reposLoaded()).toHaveProperty('type', LOAD_REPOS_SUCCESS);
  });
  it('repoLoadingError', () => {
    expect(repoLoadingError()).toHaveProperty('type', LOAD_REPOS_ERROR);
  });
  it('filterData', () => {
    expect(filterData()).toHaveProperty('type', FILTER_DATA);
  });
  it('filterReposSuccess', () => {
    expect(filterReposSuccess()).toHaveProperty('type', FILTER_DATA_SUCCESS);
  });
  it('filterReposError', () => {
    expect(filterReposError()).toHaveProperty('type', FILTER_DATA_ERROR);
  });
  it('toggleFilter', () => {
    expect(toggleFilter()).toHaveProperty('type', TOGGLE_FILTER);
  });
  it('setPeople', () => {
    expect(setPeople()).toHaveProperty('type', SET_PEOPLE);
  });
});

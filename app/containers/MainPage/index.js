import React, { memo, useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import MaterialTable, { MTableToolbar } from 'material-table';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectPeople,
  makeSelectIsFetchingPeople,
  makeSelectToggleFilter,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { auth } from '../../utils/firebase';
import {
  loadPeople as loadPeopleAction,
  loadPeopleSuccess as loadPeopleSuccessAction,
  selectDev as selectDevAction,
  filterData as filterDataAction,
  toggleFilter as toggleFilterAction,
  setPeople as setPeopleAction,
} from './actions';
import { AuthContext } from '../../context/Auth';
import tableIcons from './tableIcons';
import { streamPeopleFromDB } from './api';
import DeleteDialog from './components/DeleteDialog';
import CreateNewDialog from './components/CreateNewDialog';
import EditDevDialog from './components/EditDevDialog';
import ShowGithubRepoDialog from './components/ShowGithubRepoDialog';
import MainPageWrapper from './MainPageWrapper';

const columns = [
  { title: 'Name', field: 'name' },
  { title: 'Tech Stack', field: 'techStack' },
  { title: 'Github Handle', field: 'githubHandle' },
];

export function MainPage({
  people,
  loadPeople,
  isFetchingPeople,
  loadPeopleSuccess,
  selectedDev,
  filterData,
  toggleFilter,
  filter,
  setPeople,
}) {
  useInjectReducer({ key: 'mainPage', reducer });
  useInjectSaga({ key: 'mainPage', saga });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openGithubRepoDialog, setOpenGithubRepoDialog] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    loadPeople(currentUser.uid);
    const unsubscribe = streamPeopleFromDB(currentUser.uid, {
      next: documents =>
        loadPeopleSuccess(R.map(doc => doc.data())(documents.docs)),
    });
    return unsubscribe;
  }, []);

  const actions = [
    {
      icon: 'save',
      tooltip: 'Edit User',
      onClick: (_, row) => {
        selectedDev(row);
        setOpenEditDialog(true);
      },
    },
    {
      icon: 'delete',
      tooltip: 'Delete User',
      onClick: (_, row) => {
        selectedDev(row);
        setOpenDeleteDialog(true);
      },
    },
    {
      icon: 'folder',
      tooltip: 'Show repos',
      onClick: (_, row) => {
        selectedDev(row);
        setOpenGithubRepoDialog(true);
      },
    },
    {
      icon: 'add',
      tooltip: 'Add User',
      isFreeAction: true,
      onClick: () => {
        setOpenCreateDialog(true);
      },
    },
  ];

  const sortData = () => {
    const comparator = filter === 'asc' ? R.ascend : R.descend;
    const newFilteredPeople = R.sortWith([
      comparator(R.prop('name')),
      comparator(R.prop('githubHandle')),
    ])(people);
    setPeople(newFilteredPeople);
    toggleFilter();
  };

  return (
    <>
      <MainPageWrapper>
        <Helmet>
          <title>MainPage</title>
          <meta name="description" content="Description of MainPage" />
        </Helmet>

        <MaterialTable
          isLoading={isFetchingPeople}
          title="List of Developers"
          icons={tableIcons}
          columns={(people && columns) || []}
          data={people}
          actions={actions}
          options={{
            actionsColumnIndex: -1,
            search: false,
          }}
          components={{
            Toolbar: props => (
              <div>
                <MTableToolbar {...props} />
                <div style={{ padding: '0px 10px' }}>
                  <ButtonGroup
                    variant="contained"
                    color="primary"
                    aria-label="contained primary button group"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        filterData(currentUser.uid);
                        toggleFilter();
                      }}
                    >
                      Filter in Backend
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={sortData}
                    >
                      Filter in Client
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            ),
          }}
        />

        <DeleteDialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        />
        <EditDevDialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
        />
        <CreateNewDialog
          open={openCreateDialog}
          onClose={() => setOpenCreateDialog(false)}
        />
        <ShowGithubRepoDialog
          open={openGithubRepoDialog}
          onClose={() => setOpenGithubRepoDialog(false)}
        />
      </MainPageWrapper>
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={() => auth.signOut()}
      >
        Sign out
      </Button>
    </>
  );
}

MainPage.propTypes = {
  people: PropTypes.array,
  loadPeople: PropTypes.func,
  isFetchingPeople: PropTypes.bool,
  loadPeopleSuccess: PropTypes.func,
  selectedDev: PropTypes.func,
  filterData: PropTypes.func,
  toggleFilter: PropTypes.func,
  filter: PropTypes.string,
  setPeople: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  people: makeSelectPeople(),
  isFetchingPeople: makeSelectIsFetchingPeople(),
  filter: makeSelectToggleFilter(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadPeople: userId => dispatch(loadPeopleAction(userId)),
    loadPeopleSuccess: people => dispatch(loadPeopleSuccessAction(people)),
    selectedDev: selectedDev => dispatch(selectDevAction(selectedDev)),
    filterData: userId => dispatch(filterDataAction(userId)),
    toggleFilter: () => dispatch(toggleFilterAction()),
    setPeople: people => dispatch(setPeopleAction(people)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MainPage);

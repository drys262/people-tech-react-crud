import React, { memo, useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import MaterialTable from 'material-table';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectPeople, makeSelectIsFetchingPeople } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { auth } from '../../utils/firebase';
import { loadPeople, loadPeopleSuccess } from './actions';
import { AuthContext } from '../../context/Auth';
import tableIcons from './tableIcons';
import { streamPeopleFromDB, deleteDevFromDB } from './api';
import DeleteDialog from './DeleteDialog';
import CreateNewDialog from './CreateNewDialog';
import EditDevDialog from './EditDevDialog';

const columns = [
  { title: 'Name', field: 'name' },
  { title: 'Tech Stack', field: 'techStack' },
  { title: 'Github Handle', field: 'githubHandle' },
];

export function MainPage({
  people,
  loadPeopleData,
  isFetchingPeople,
  loadPeopleSuccessData,
}) {
  useInjectReducer({ key: 'mainPage', reducer });
  useInjectSaga({ key: 'mainPage', saga });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedDev, setSelectedDev] = useState({});
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    loadPeopleData(currentUser.uid);
    const unsubscribe = streamPeopleFromDB(currentUser.uid, {
      next: documents =>
        loadPeopleSuccessData(R.map(doc => doc.data())(documents.docs)),
    });
    return unsubscribe;
  }, []);

  const actions = [
    {
      icon: 'save',
      tooltip: 'Edit User',
      onClick: (_, row) => {
        setSelectedDev(row);
        setOpenEditDialog(true);
      },
    },
    {
      icon: 'delete',
      tooltip: 'Delete User',
      onClick: (_, row) => {
        setSelectedDev(row);
        setOpenDeleteDialog(true);
      },
    },
    {
      icon: 'folder',
      tooltip: 'Show repos',
      onClick: () => {},
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

  const deleteDevHandler = async () => {
    setOpenDeleteDialog(false);
    await deleteDevFromDB(currentUser.uid, selectedDev.devId);
    setSelectedDev({});
  };

  return (
    <div>
      <Helmet>
        <title>MainPage</title>
        <meta name="description" content="Description of MainPage" />
      </Helmet>

      <button type="button" onClick={() => auth.signOut()}>
        Sign out
      </button>

      <MaterialTable
        isLoading={isFetchingPeople}
        title="List of Developers"
        icons={tableIcons}
        columns={(people && columns) || []}
        data={people}
        actions={actions}
        options={{
          actionsColumnIndex: -1,
        }}
      />

      <DeleteDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        selectedDev={selectedDev}
        deleteButtonHandler={deleteDevHandler}
      />
      <EditDevDialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        selectedDev={selectedDev}
      />
      <CreateNewDialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
      />
    </div>
  );
}

MainPage.propTypes = {
  people: PropTypes.array,
  loadPeopleData: PropTypes.func,
  isFetchingPeople: PropTypes.bool,
  loadPeopleSuccessData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  people: makeSelectPeople(),
  isFetchingPeople: makeSelectIsFetchingPeople(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadPeopleData: userId => dispatch(loadPeople(userId)),
    loadPeopleSuccessData: people => dispatch(loadPeopleSuccess(people)),
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

import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { deleteDevFromDB } from '../api';
import { makeSelectSelectedDev } from '../selectors';
import { AuthContext } from '../../../context/Auth';

function DeleteDialog({ open, onClose, selectedDev }) {
  const {
    currentUser: { uid },
  } = useContext(AuthContext);
  const deleteHandler = async () => {
    onClose();
    await deleteDevFromDB(uid, selectedDev.devId);
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you want to delete `{selectedDev.name}`?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={deleteHandler} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  selectedDev: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  selectedDev: makeSelectSelectedDev(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  memo,
)(DeleteDialog);

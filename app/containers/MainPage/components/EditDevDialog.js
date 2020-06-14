import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import SpanError from './SpanError';
import { AuthContext } from '../../../context/Auth';
import { makeSelectSelectedDev } from '../selectors';

import { updateDevFromDB } from '../api';

export function EditDevDialog({ open, onClose, selectedDev }) {
  const { name, techStack, githubHandle, devId } = selectedDev;
  const { handleSubmit, register, errors, reset } = useForm();

  const {
    currentUser: { uid },
  } = useContext(AuthContext);

  const onSubmit = async data => {
    onClose();
    await updateDevFromDB({
      ...data,
      userId: uid,
      devId,
    });
    reset();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="form-dialog-title">Edit Developer</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>
            {'Please enter the developer details.'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            defaultValue={name}
            inputRef={register({ required: true })}
          />
          {errors.name && <SpanError>This field is required.</SpanError>}
          <TextField
            margin="dense"
            id="techStack"
            name="techStack"
            label="Tech Stack"
            type="text"
            fullWidth
            defaultValue={techStack}
            inputRef={register}
          />
          <TextField
            margin="dense"
            id="github"
            name="githubHandle"
            label="GitHub Handle"
            type="text"
            fullWidth
            defaultValue={githubHandle}
            inputRef={register}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

EditDevDialog.propTypes = {
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
)(EditDevDialog);

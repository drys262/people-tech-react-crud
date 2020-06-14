import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function CreateNewDialog({ open, onClose }) {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="form-dialog-title">Create new Developer</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {'Please enter the developer details.'}
        </DialogContentText>
        <form onSubmit={handleSubmit(onSubmit)} />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          ref={register({ required: true })}
        />
        {errors.name && <span>This field is required</span>}
        <TextField
          autoFocus
          margin="dense"
          id="tech"
          label="Tech Stack"
          type="text"
          fullWidth
          ref={register}
        />
        <TextField
          autoFocus
          margin="dense"
          id="github"
          label="GitHub Handle"
          type="text"
          fullWidth
          ref={register}
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
    </Dialog>
  );
}

CreateNewDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

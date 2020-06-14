import React, { useEffect, memo } from 'react';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from 'components/Alert';
import {
  makeSelectSelectedDev,
  makeSelectRepos,
  makeSelectError,
  makeSelectLoading,
} from '../selectors';
import { makeSelectErrorMessage } from '../../App/selectors';
import { loadRepos } from '../actions';
import { clearError } from '../../App/actions';
import GithubMessage from '../GithubMessage';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function ShowGithubRepoDialog({
  open,
  onClose,
  selectedDev,
  loadUserRepos,
  repos,
  error,
  clearErrorMessage,
  errorMessage,
  loading,
}) {
  const classes = useStyles();

  const openError = (errorMessage && true) || false;

  useEffect(() => {
    loadUserRepos();
  }, [selectedDev]);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={clearErrorMessage}
      >
        <Alert onClose={clearErrorMessage} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {selectedDev.name} Public GitHub Repositories
          </Typography>
          <Button autoFocus color="inherit" onClick={onClose}>
            Close
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        {!error && loading && <GithubMessage>Loading ...</GithubMessage>}
        {(error && (
          <GithubMessage>
            Error retrieving with the specific github handle.
          </GithubMessage>
        )) ||
          (!loading &&
            repos.map(({ id, html_url: htmlUrl, name }, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <React.Fragment key={`${index}-${id}`}>
                {' '}
                <ListItem
                  button
                  onClick={() => {
                    window.open(htmlUrl);
                  }}
                >
                  <ListItemText primary={name} />
                </ListItem>
                <Divider />
              </React.Fragment>
            )))}
      </List>
    </Dialog>
  );
}

ShowGithubRepoDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  selectedDev: PropTypes.object,
  loadUserRepos: PropTypes.func,
  repos: PropTypes.array,
  error: PropTypes.bool,
  clearErrorMessage: PropTypes.func,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  selectedDev: makeSelectSelectedDev(),
  repos: makeSelectRepos(),
  error: makeSelectError(),
  errorMessage: makeSelectErrorMessage(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadUserRepos: () => dispatch(loadRepos()),
    clearErrorMessage: () => dispatch(clearError()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ShowGithubRepoDialog);

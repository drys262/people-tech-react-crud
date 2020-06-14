/**
 *
 * Alert
 *
 */
import React, { memo } from 'react';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

Alert.propTypes = {};

export default memo(Alert);

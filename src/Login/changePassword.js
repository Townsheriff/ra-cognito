import React from 'react';
import { Form, Field } from 'react-final-form';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { translate } from 'ra-core';
import styles from './formStyles';
import mapStateToProps from './isLoading';

const compose = (...funcs) =>
  funcs.reduce((a, b) => (...args) => a(b(...args)), arg => arg)


// see http://redux-form.com/6.4.3/examples/material-ui/
const renderInput = ({
  meta: { touched, error } = {}, // eslint-disable-line react/prop-types
  input: { ...inputProps }, // eslint-disable-line react/prop-types
  ...props
}) => (
  <TextField
    error={Boolean(touched && error)}
    helperText={touched && error}
    {...inputProps}
    {...props}
    fullWidth
  />
);

export const ChangePasswordForm = ({ classes, translate, changePassword }) => (
  <Form
    onSubmit={changePassword}
    // TODO: add validation
  >
    {({ handleSubmit, submitting }) => (
      <form onSubmit={handleSubmit}>
        <div className={classes.form}>
          <Typography variant={'body1'}>
            Please change your password to continue signing in.
          </Typography>
          <div className={classes.input}>
            <Field
              id="password"
              name="password"
              component={renderInput}
              label={translate('ra.auth.password')}
              type="password"
              disabled={submitting}
            />
          </div>
        </div>
        <CardActions>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={submitting}
            className={classes.button}
          >
            {submitting && <CircularProgress size={25} thickness={2} />}
            {'Change Password'}
          </Button>
        </CardActions>
      </form>
    )}
  </Form>
);

const enhance = compose(
  withStyles(styles),
  translate,
  connect(mapStateToProps)
);

export default enhance(ChangePasswordForm);

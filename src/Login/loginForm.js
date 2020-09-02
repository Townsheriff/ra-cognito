import React from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { translate } from 'ra-core';
import styles from './formStyles';
import mapStateToProps from './isLoading';
import validate from './validateLoginForm';
import { Recaptcha } from 'react-recaptcha';

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

export const LoginForm = ({ classes, translate, login }) => (
  <Form
    onSubmit={login}
    // validate={validate} // TODO: fix validation
  >
    {({ handleSubmit, submitting }) => (
      <form onSubmit={handleSubmit}>
        <div className={classes.form}>
          <div className={classes.input}>
            <Field
              id="username"
              name="username"
              component={renderInput}
              label={translate('ra.auth.username')}
              disabled={submitting}
            />
          </div>
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
          <div className={classes.input}>
            <Recaptcha
              id="captchaToken"
              sitekey={process.env.RA_RECAPTCHA_SITE_KEY}
              size={process.env.RA_RECAPTCHA_SIZE}
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
            {translate('ra.auth.sign_in')}
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

export default enhance(LoginForm);

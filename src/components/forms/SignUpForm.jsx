import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      open: false
    }
  }

  submitSignUp(event) {
    event.preventDefault();
    const formData = {
      credentials: {
        email: this.refs.email.getValue(),
        password: this.refs.password.getValue(),
        password_confirmation: this.refs.passwordConf.getValue()
      }
    }

    this.props.handleAuth('sign-up', formData)
      .then(() => {
        this.props.handleAuth('sign-in', formData)
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            localStorage.setItem('id', json.user.id);
            localStorage.setItem('email', json.user.email);
            localStorage.setItem('token', json.user.token);
            this.refs.form.reset();
            this.props.updateAuthStatus(true)
          })
          .catch(() => {
            this.setState({ error: true, open: true })
          });
      })
      .catch(() => {
        this.setState({ error: true, open: true })
      });
  }

  render() {
    return (
      <div className='form-wrap'>
        <h2>Sign Up</h2>
        <form ref='form' action='sign-up' onSubmit={ this.submitSignUp.bind(this) }>
          <TextField
            ref='email'
            hintText='Email'
            floatingLabelText='Email'
            fullWidth={true}
            type='text'
          />
          <br />
          <TextField
            ref='password'
            hintText='Password'
            floatingLabelText='Password'
            fullWidth={true}
            type='password'
          />
          <br />
          <TextField
            ref='passwordConf'
            hintText='Password Confirmation'
            floatingLabelText='Password Confirmation'
            fullWidth={true}
            type='password'
          />
          <Snackbar
            open={this.state.open}
            message={'Sorry something went wrong. Please try again.'}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
        <RaisedButton type='submit' label='Submit' primary={true} />
        </form>
      </div>
    )
  }
}

export default SignUpForm;

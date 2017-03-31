import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

const successMsg = 'Woohoo! Please sign in.';
const ajaxMsg = 'Sorry there was an issue. Please try again.';

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
      .then((response) => {
        if (response.status !== 201) {
          this.setState({ error: true, open: true })
        } else {
          this.setState({ open: true, error: false })
        }
      })
      .then(() => this.refs.form.reset())
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
            message={ this.state.error ? ajaxMsg : successMsg }
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

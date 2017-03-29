import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      open: false
    }
  }

  submitSignIn(event) {
    event.preventDefault();
    const formData = {
      credentials: {
        email: this.refs.email.getValue(),
        password: this.refs.password.getValue(),
      }
    }

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
  }

  render() {
    return (
      <div className='form-wrap'>
        <h2>Sign In</h2>
        <form ref='form' action='sign-in' onSubmit={ this.submitSignIn.bind(this) }>
          <TextField
            hintText='Email'
            floatingLabelText='Email'
            fullWidth={true}
            ref='email'
            type='text'
          />
          <br />
          <TextField
            hintText='Password'
            floatingLabelText='Password'
            fullWidth={true}
            ref='password'
            type='password'
          />
        <RaisedButton type='submit' label='Submit' primary={true} />
      </form>
      <Snackbar
        open={this.state.open}
        message={'Sorry something went wrong. Please try again.'}
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose}
      />
    </div>
    )
  }
}

export default SignInForm;

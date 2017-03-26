import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class SignUpForm extends React.Component {
  render() {
    return (
      <div className="form-wrap">
        <h2>Sign Up</h2>
        <form action="sign-up">
          <TextField
            hintText="Email"
            floatingLabelText="Email"
            fullWidth={true}
            type="text"
          />
          <br />
          <TextField
            hintText="Password"
            floatingLabelText="Password"
            fullWidth={true}
            type="password"
          />
          <br />
          <TextField
            hintText="Password Confirmation"
            floatingLabelText="Password Confirmation"
            fullWidth={true}
            type="password"
          />
        <RaisedButton type="submit" label="Submit" primary={true} />
        </form>
      </div>
    )
  }
}

export default SignUpForm;

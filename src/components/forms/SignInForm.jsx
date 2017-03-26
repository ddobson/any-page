import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class SignInForm extends React.Component {
  render() {
    return (
      <div className="form-wrap">
        <h2>Sign In</h2>
        <form action="sign-in">
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
        <RaisedButton type="submit" label="Submit" primary={true} />
      </form>
    </div>
    )
  }
}

export default SignInForm;

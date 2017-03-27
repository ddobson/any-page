import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

class ChangePwForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resetSucess: false,
      open: false
    }
  }

  submitSignUp(event) {
    event.preventDefault();
    const formData = {
      passwords: {
        old: this.refs.old.getValue(),
        new: this.refs.new.getValue()
      }
    }

    this.props.handleAuth('change-pw', formData)
      .then((response) => {
        if (response.status !== 204) {
          this.setState({ resetSucess: false, open: true })
        } else  {
          this.setState({ resetSucess: true, open: true })
        }
        this.refs.form.reset();
      })
      .catch(console.error);
  }

  render() {
    return (
      <div className="form-wrap">
        <h2>Change Password</h2>
        <form ref="form" action="sign-up" onSubmit={ this.submitSignUp.bind(this) }>
          <TextField
            ref="old"
            hintText="Old Password"
            floatingLabelText="Old Password"
            fullWidth={true}
            type="password"
          />
          <br />
          <TextField
            ref="new"
            hintText="New Password"
            floatingLabelText="New Password"
            fullWidth={true}
            type="password"
          />
        <RaisedButton type="submit" label="Submit" primary={true} />
        </form>
        <Snackbar
          open={this.state.open}
          message={this.state.resetSucess ? 'Your reset was successful!' : 'Sorry something went wrong. Please try again.'}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}

export default ChangePwForm;

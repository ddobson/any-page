import React from 'react';

// Components
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class NewCookbookForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleNewSubmit = this.handleNewSubmit.bind(this);
  }

  handleNewSubmit(event) {
    event.preventDefault();
    const form = this.refs.form;
    const formData = {
      cookbook: {
        title: this.refs.newCbTitle.getValue(),
        start_page: this.refs.newCbStart.getValue(),
        end_page: this.refs.newCbEnd.getValue()
      }
    }

    this.props.handleNewCb(formData, form);
  }

  render() {
    return (
      <Paper zDepth={2}>
        <div className='form-wrap'>
          <h2>Create a Cookbook</h2>
          <form ref='form' action='new-recipe' onSubmit={ this.handleNewSubmit }>
            <TextField
              hintText='Book Title'
              floatingLabelText='Book Title'
              fullWidth={true}
              ref='newCbTitle'
              required={true}
              type='text'
              maxLength='250'
            />
            <TextField
              hintText='Start Page'
              floatingLabelText='Start Page'
              ref='newCbStart'
              required={true}
              type='number'
              min='1'
              max='1000'
              step='1'
            />
            <br />
            <TextField
              hintText='Start Page'
              floatingLabelText='Start Page'
              ref='newCbEnd'
              required={true}
              type='number'
              min='1'
              max='1000'
              step='1'
            />
            <br />
          <RaisedButton type='submit' label='Create' primary={true} />
          </form>
        </div>
      </Paper>
    )
  }
}

export default NewCookbookForm;

import React from 'react';
import ValidationService from '../../services/ValidationService';

import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const validations = new ValidationService();

class EditCookbookForm extends React.Component {
  handleEditSubmit(event) {
    event.preventDefault();
    const form = this.refs.form;
    const cookbook = this.props.cookbook;
    const formData = {
      cookbook: {
        title: this.refs.newCbTitle.getValue(),
        start_page: this.refs.newCbStart.getValue(),
        end_page: this.refs.newCbEnd.getValue()
      }
    }
    const valid = validations.validateEditCookbook(formData, cookbook);
    console.log(valid[0]);
    console.log(valid[1]);
  }

  render() {
    return (
      <Paper zDepth={2}>
        <div className='form-wrap'>
          <h2>Edit Your Cookbook</h2>
          <p>If you don't want to change a field from it's previous value, leave it blank.</p>
          <p>Only fields you change will be updated.</p>
          <form ref='form' action='new-recipe' onSubmit={ this.handleEditSubmit.bind(this) }>
            <TextField
              hintText='Book Title'
              floatingLabelText='Book Title'
              fullWidth={true}
              ref='newCbTitle'
              type='text'
              maxLength='250'
            />
            <TextField
              hintText='Start Page'
              floatingLabelText='Start Page'
              ref='newCbStart'
              type='number'
              min='1'
              max='1000'
              step='1'
            />
            <br />
            <TextField
              hintText='End Page'
              floatingLabelText='End Page'
              ref='newCbEnd'
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

export default EditCookbookForm;

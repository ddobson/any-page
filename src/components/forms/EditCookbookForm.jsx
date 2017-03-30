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
        title: this.refs.newCbTitle.getValue() || cookbook.title,
        start_page: this.refs.newCbStart.getValue() || cookbook.start_page,
        end_page: this.refs.newCbEnd.getValue() || cookbook.end_page
      }
    }
    const valid = validations.validateEditCookbook(formData, cookbook);

    this.props.updateCookbook(formData, form, valid)
  }

  render() {
    return (
      <Paper zDepth={2}>
        <div className='form-wrap columns'>
          <div className='column col-xs-12 col-md-6'>
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
            <RaisedButton type='submit' label='Update' primary={true} />
            </form>
          </div>
          <div className="column col-xs-12 col-md-6">
            <h2>Current Details</h2>
            <h3>Title: { this.props.cookbook.title || ''}</h3>
            <h3>Start Page: { this.props.cookbook.start_page || ''}</h3>
            <h3>End Page: { this.props.cookbook.end_page || ''}</h3>
          </div>
        </div>
      </Paper>
    )
  }
}

export default EditCookbookForm;

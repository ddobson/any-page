import React from 'react';
import ValidationService from '../../services/ValidationService';

// Components
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const validations = new ValidationService();

class EditRecipeForm extends React.Component {
  constructor(props) {
    super(props)

    this.handleEditSubmit = this.handleEditSubmit.bind(this);
  }

  handleEditSubmit(event) {
    event.preventDefault();
    const form = this.refs.form;
    const availPages = this.props.cookbook.avail_pages;
    const recipe = this.props.recipe;
    const cookbook = this.props.cookbook;
    const formData = {
      recipe: {
        name: this.refs.editRecipeName.getValue() || recipe.name,
        start_page: this.refs.editRecipeStart.getValue() || recipe.start_page,
        end_page: this.refs.editRecipeEnd.getValue() || recipe.end_page,
        comments: this.refs.editComments.getValue() || recipe.comments
      }
    }
    const valid = validations.validateRecipe(formData, availPages, 'edit', cookbook, recipe);

    this.props.handleEditRecipe(formData, form, valid);
  }

  render() {
    return (
      <Paper zDepth={2}>
        <div className="form-wrap columns">
          <div className="column col-xs-12 col-md-6">
            <h2>Edit Your Recipe</h2>

            <form ref='form' action='new-recipe' onSubmit={ this.handleEditSubmit }>
              <TextField
                hintText='Name'
                floatingLabelText='Name'
                fullWidth={true}
                ref='editRecipeName'
                type='text'
                maxLength='250'
              />
              <br />
              <TextField
                hintText='Start Page'
                floatingLabelText='Start Page'
                ref='editRecipeStart'
                type='number'
                min='1'
                max='1000'
                step='1'
              />
              <br />
              <TextField
                hintText='End Page'
                floatingLabelText='End Page'
                ref='editRecipeEnd'
                type='number'
                min='1'
                max='1000'
                step='1'
              />
              <br />
              <TextField
                floatingLabelText='Comments'
                multiLine={true}
                ref='editComments'
                type='number'
                min='1'
                max='1000'
                step='1'
                rows={5}
              />
              <br />
              <RaisedButton type='submit' label='Save It!' primary={true} />
            </form>
          </div>
          <div className="column col-xs-12 col-md-6">
            <h2>Current Details</h2>
            <h3>Name: { this.props.recipe.name || ''}</h3>
            <h3>Start: { this.props.recipe.start_page || ''}</h3>
            <h3>End: { this.props.recipe.end_page || ''}</h3>
            <h3>Comments: { this.props.recipe.comments || ''}</h3>
          </div>
        </div>
      </Paper>
    )
  }
}

export default EditRecipeForm;

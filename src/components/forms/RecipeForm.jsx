import React from 'react';

// Components
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleNewSubmit = this.handleNewSubmit.bind(this);
    this.isValidForm = this.isValidForm.bind(this);
  }

  isValidForm(formData) {
    const startPage = parseInt(formData.recipe.start_page, 10);
    const endPage = parseInt(formData.recipe.end_page, 10);
    const availPages = this.props.availPages;

    if (
      endPage < startPage ||
      startPage < availPages[0] ||
      endPage > availPages[availPages.length - 1]
    ) {
      console.error('validation failed');
      return false;
    }

    return true;
  }

  handleNewSubmit(event) {
    event.preventDefault();
    const form = this.refs.form;
    const formData = {
      recipe: {
        name: this.refs.newRecipeName.getValue(),
        start_page: this.refs.newRecipeStart.getValue(),
        end_page: this.refs.newRecipeEnd.getValue()
      }
    }

    if (this.isValidForm(formData)) {
      this.props.handleNewRecipe(formData, form);
    } else {
      return;
    }
  }

  getRandomPage() {
    if (!this.props.availPages) {
      return;
    } else {
      const availPages = this.props.availPages;
      return availPages[Math.floor(Math.random()*availPages.length)];
    }
  }

  render() {
    const randomPage = this.getRandomPage();
    return (
      <Paper zDepth={2}>
        <div className="form-wrap columns">
          <div className="column col-xs-12 col-md-6">
            <h2>Create a Recipe</h2>
            <form ref='form' action='new-recipe' onSubmit={ this.handleNewSubmit }>
              <TextField
                hintText='Name'
                floatingLabelText='Name'
                fullWidth={true}
                ref='newRecipeName'
                required={true}
                type='text'
                maxLength='250'
              />
              <br />
              <TextField
                hintText='Start Page'
                floatingLabelText='Start Page'
                ref='newRecipeStart'
                required={true}
                type='number'
                min='1'
                max='1000'
                step='1'
              />
              <br />
              <TextField
                hintText='End Page'
                floatingLabelText='End Page'
                ref='newRecipeEnd'
                required={true}
                type='number'
                min='1'
                max='1000'
                step='1'
              />
            <br />
            <RaisedButton type='submit' label='Save It!' primary={true} />
            </form>
          </div>
          <div className="column col-xs-12 col-md-6">
            {<h2>Your Page: { randomPage || 'N/A' }</h2>}
          </div>
        </div>
      </Paper>
    )
  }
}

export default RecipeForm;

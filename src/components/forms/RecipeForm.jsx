import React from 'react';
import ValidationService from '../../services/ValidationService';

// Components
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const validations = new ValidationService();

class RecipeForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleNewSubmit = this.handleNewSubmit.bind(this);
  }

  handleNewSubmit(event) {
    event.preventDefault();
    const form = this.refs.form;
    const availPages = this.props.availPages;
    const formData = {
      recipe: {
        name: this.refs.newRecipeName.getValue(),
        start_page: this.refs.newRecipeStart.getValue(),
        end_page: this.refs.newRecipeEnd.getValue()
      }
    }
    const valid = validations.validateRecipe(formData, availPages);

    this.props.handleNewRecipe(formData, form, valid);
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

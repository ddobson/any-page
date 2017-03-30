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

    this.state = {
      randomPage: ' ',
    }

    this.handleNewSubmit = this.handleNewSubmit.bind(this);
    this.getRandomPage = this.getRandomPage.bind(this);
   }

  componentWillReceiveProps(nextprops) {
    if (nextprops.availPages) {
      this.getRandomPage(nextprops.availPages);
    }
  }

  handleNewSubmit(event) {
    event.preventDefault();
    const form = this.refs.form;
    const cookbook = this.props.cookbook;
    const availPages = this.props.availPages;
    const formData = {
      recipe: {
        name: this.refs.newRecipeName.getValue(),
        start_page: this.refs.newRecipeStart.getValue(),
        end_page: this.refs.newRecipeEnd.getValue()
      }
    }
    const valid = validations.validateRecipe(formData, availPages, 'new', cookbook);

    this.props.handleNewRecipe(formData, form, valid);
  }

  getRandomPage(availPages) {
    const randomPage = availPages[Math.floor(Math.random()*availPages.length)];

    this.setState({ randomPage });
  }

  render() {
    return (
      <Paper zDepth={2}>
        <div className="form-wrap columns">
          <div className="column col-xs-12 col-md-6 center">
            {<h2>Suggested Page</h2>}
            <h1 className='suggestion'>{ this.state.randomPage || 'None Left!' }</h1>
            <RaisedButton onTouchTap={() => this.getRandomPage(this.props.availPages)} label='Get Another Page' primary={true} />
          </div>
          <div className="column col-xs-12 col-md-6">
            <h2>Your Suggestions</h2>
            <p>Like the recipe on this page? Save it and we'll remove it from future suggestions.</p>
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
        </div>
      </Paper>
    )
  }
}

export default RecipeForm;

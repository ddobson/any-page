import React from 'react';

// Components
import CookBookService from '../services/cookbook-api';
import EditRecipeForm from './forms/EditRecipeForm';
import Snackbar from 'material-ui/Snackbar';

const cbService = new CookBookService();
const ajaxErrorMsg = 'Sorry something went wrong. Please try again.';

class RecipeDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      open: false,
      errorMsg: '',
      recipe: {},
      cookbook: {}
    }

    this.recipeId = this.props.match.params.id;

    this.handleEditRecipe = this.handleEditRecipe.bind(this);
  }

  componentDidMount() {
    this.setState({ open: false });

    cbService.getRecipe(this.recipeId)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ recipe: json.recipe });
      })
      .then(() => {
        cbService.getCookbook(this.state.recipe.cookbook_id)
          .then((response) => response.json())
          .then((json) => {
            this.setState({ cookbook: json.cookbook });
          })
          .catch(() => this.setState({ open: true, errorMsg: ajaxErrorMsg }));
      })
      .catch(() => this.setState({ open: true, errorMsg: ajaxErrorMsg }));
  }

  handleEditRecipe(data, form, valid) {
    if (!valid[0]) {
      this.setState({ open: true, errorMsg: valid[1]});
      return;
    }

    this.setState({ open: false, errorMsg: '' })

    cbService.updateRecipe(this.recipeId, data)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ recipe: json.recipe });
        form.reset();
      })
      .then(() => {
        cbService.getCookbook(this.state.recipe.cookbook_id)
          .then((response) => response.json())
          .then((json) => {
            this.setState({ cookbook: json.cookbook });
          })
          .catch(() => this.setState({ open: true, errorMsg: ajaxErrorMsg }));
      })
      .catch(() => this.setState({ open: true, errorMsg: ajaxErrorMsg }));
  }

  render() {
    return (
      <div>
        <EditRecipeForm handleEditRecipe={ this.handleEditRecipe } recipe={ this.state.recipe } cookbook={ this.state.cookbook } />
          <Snackbar
            open={this.state.open}
            message={this.state.errorMsg}
            autoHideDuration={5000}
            onRequestClose={this.handleRequestClose}
          />
      </div>
    )
  }
}

export default RecipeDetail;

import React from 'react';

// Components
import CookBookService from '../services/cookbook-api';
import EditRecipeForm from './forms/EditRecipeForm';
import Snackbar from 'material-ui/Snackbar';

const cbService = new CookBookService();

class RecipeDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      open: false,
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
          .catch(() => this.setState({ open: true }))
      })
      .catch(() => this.setState({ open: true }));
  }

  handleEditRecipe(data, form) {
    cbService.updateRecipe(this.recipeId, data)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ recipe: json.recipe });
        form.reset();
      })
      .catch(() => this.setState({ open: true }));
  }

  render() {
    return (
      <div>
        <EditRecipeForm handleEditRecipe={ this.handleEditRecipe } recipe={ this.state.recipe } cookbook={ this.state.cookbook } />
          <Snackbar
            open={this.state.open}
            message={'Sorry something went wrong. Please try again.'}
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />
      </div>
    )
  }
}

export default RecipeDetail;

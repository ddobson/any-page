import React from 'react';

// Components
import CookBookService from '../services/cookbook-api';
import EditRecipeForm from './forms/EditRecipeForm';

const cbService = new CookBookService();

class RecipeDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      recipe: {},
      cookbook: {}
    }

    this.recipeId = this.props.match.params.id;

    this.handleEditRecipe = this.handleEditRecipe.bind(this);
  }

  componentDidMount() {
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
          });
      });
  }

  handleEditRecipe(data, form) {
    cbService.updateRecipe(this.recipeId, data)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ recipe: json.recipe });
        form.reset();
      })
  }

  render() {
    return (
      <EditRecipeForm handleEditRecipe={ this.handleEditRecipe } recipe={ this.state.recipe } cookbook={ this.state.cookbook } />
    )
  }
}

export default RecipeDetail;

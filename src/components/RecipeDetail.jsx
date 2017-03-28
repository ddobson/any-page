import React from 'react';
import CookBookService from '../services/cookbook-api';

const cbService = new CookBookService();

class RecipeDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      recipe: {}
    }

    this.recipeId = this.props.match.params.id
  }

  componentDidMount() {
    cbService.getRecipe(this.recipeId)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ recipe: json.recipe });
      });
  }

  render() {
    return (
      <h1>{this.state.recipe.name || 'loading...'}</h1>
    )
  }
}

export default RecipeDetail;

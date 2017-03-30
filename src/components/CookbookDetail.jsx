import React from 'react';

// Components
import CookBookService from '../services/cookbook-api';
import RecipeForm from './forms/RecipeForm';
import RecipeSwatch from './RecipeSwatch';
import Snackbar from 'material-ui/Snackbar';

const cbService = new CookBookService();
const ajaxErrorMsg = 'Sorry something went wrong. Please try again.';

class CookbookDetail extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      open: false,
      errorMsg: '',
      cookbook: {
        recipes: []
      }
    }

    this.cookbookId = this.props.match.params.id;

    this.handleNewRecipe = this.handleNewRecipe.bind(this);
    this.handleDestroyRecipe = this.handleDestroyRecipe.bind(this);
  }

  componentDidMount() {
    this.setState({ open: false });

    cbService.getCookbook(this.cookbookId)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ cookbook: json.cookbook, isLoading: false })
      })
      .catch(() => this.setState({ open: true, errorMsg: ajaxErrorMsg }));
  }

  handleNewRecipe(formData, form, valid) {
    if (!valid[0]) {
      this.setState({ open: true, errorMsg: valid[1]})
      return;
    }

    this.setState({ open: false, errorMsg: '' })

    cbService.createRecipe(this.cookbookId, formData)
      .then(() => {
        this.setState( {isLoading: true} )
        cbService.getCookbook(this.cookbookId)
          .then((response) => response.json())
          .then((json) => {
            this.setState({ cookbook: json.cookbook, isLoading: false })
          })
          .catch(() => this.setState({ open: true, errorMsg: ajaxErrorMsg }));

        form.reset();
      })
      .catch(() => this.setState({ open: true, errorMsg: ajaxErrorMsg }));
  }

  handleDestroyRecipe(id) {
    cbService.destroyRecipe(id)
      .then(() => {
        this.setState( {isLoading: true} )
        cbService.getCookbook(this.cookbookId)
          .then((response) => response.json())
          .then((json) => {
            this.setState({ cookbook: json.cookbook, isLoading: false })
          })
          .catch(() => this.setState({ open: true, errorMsg: ajaxErrorMsg }));
      })
      .catch(() => this.setState({ open: true, errorMsg: ajaxErrorMsg }));
  }

  render() {
    const cookbook = this.state.cookbook;
    let content = null;
    let swatches = null;

    if (!this.isLoading) {
      content = <h2>Your Recipes</h2>;
      swatches = cookbook.recipes.map((recipe, i) => <RecipeSwatch handleDestroyRecipe={this.handleDestroyRecipe} key={i} recipe={recipe} />);
    }

    return (
      <div>
        <h1>{cookbook.title || ''}</h1>
        <RecipeForm
          handleNewRecipe={ this.handleNewRecipe }
          cookbook={ cookbook }
          availPages={ cookbook.avail_pages }
        />
        { content }
        { swatches }
        <Snackbar
          open={this.state.open}
          message={this.state.errorMsg}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}

export default CookbookDetail;

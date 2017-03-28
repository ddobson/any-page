import React from 'react';
import CookBookService from '../services/cookbook-api';
import RecipeForm from './forms/RecipeForm';

const cbService = new CookBookService();

class CookbookDetail extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      cookbook: {}
    }

    this.cookbookId = this.props.match.params.id;

    this.handleNewRecipe = this.handleNewRecipe.bind(this)
  }

  componentDidMount() {
    cbService.getCookbook(this.cookbookId)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ cookbook: json.cookbook, isLoading: false })
      });
  }

  handleNewRecipe(formData, form) {
    cbService.createRecipe(this.cookbookId, formData)
      .then(() => {
        this.setState( {isLoading: true} )
        cbService.getCookbook(this.cookbookId)
          .then((response) => response.json())
          .then((json) => {
            this.setState({ cookbook: json.cookbook, isLoading: false })
          })
          .catch(console.error);

        form.reset();
      })
      .catch(console.error);
  }

  render() {
    const cookbook = this.state.cookbook;
    let content = <h1>{this.cookbookId}</h1>;

    if (!this.isLoading) {
      content = <h1>{cookbook.title}</h1>
    }

    return (
      <div>
        <h1>{cookbook.title || ''}</h1>
        <RecipeForm
          handleNewRecipe={ this.handleNewRecipe }
          cookbookId={ cookbook.id }
          availPages={ cookbook.avail_pages }
        />
        {content}
      </div>
    )
  }
}

export default CookbookDetail;

import React from 'react';
import CookBookService from '../services/cookbook-api';

// Components
import NewCookbookForm from './forms/NewCookbookForm';

const cbService = new CookBookService();

class CookbookMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cookbooks: [],
    }

    this.handleNewCb = this.handleNewCb.bind(this);
  }

  handleNewCb(formData, form) {
    cbService.createCookbook(formData)
      .then((response) => response.json())
      .then((json) => {
        const cookbooks = this.state.cookbooks.slice()
          cookbooks.push(json.cookbook);

        this.setState({ cookbooks })
        form.reset();
      })
      .catch(console.error);
  }

  render() {
    return (
      <NewCookbookForm handleNewCb={ this.handleNewCb } />
    )
  }
}

export default CookbookMenu;

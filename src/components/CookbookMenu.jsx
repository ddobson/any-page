import React from 'react';
import CookBookService from '../services/cookbook-api';

// Components
import NewCookbookForm from './forms/NewCookbookForm';
import CircularProgress from 'material-ui/CircularProgress';
import CookbookSwatch from './CookbookSwatch'

const cbService = new CookBookService();

class CookbookMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cookbooks: [],
      isLoading: true,
    }

    this.handleNewCb = this.handleNewCb.bind(this);
  }

  componentDidMount() {
    cbService.getCookbooks()
      .then((response) => response.json())
      .then((json) => {
        const cookbooks = this.state.cookbooks.slice()
          json.cookbooks.forEach((cookbook) => cookbooks.push(cookbook));

        // Remove for production
        setTimeout(() => {
          this.setState({ cookbooks, isLoading: false })
        }, 1000)
      });
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
    const isLoading = this.state.isLoading;
    const cookbooks = this.state.cookbooks;
    let content = null;
    let swatches = null;

    if (isLoading) {
      content = <CircularProgress size={100} thickness={7} style={{marginLeft: '50%', marginTop: '60px', left: '-50px'}} />;
    } else {
      content = <NewCookbookForm handleNewCb={ this.handleNewCb } />;
      swatches = cookbooks.map((cookbook, i) => <CookbookSwatch key={i} cookbook={cookbook} />);
    }

    return (
      <div className='containter'>
        <div className='row'>
          { content }
        </div>
        <div className='columns'>
          { swatches }
        </div>
      </div>
    )
  }
}

export default CookbookMenu;

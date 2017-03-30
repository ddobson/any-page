import React from 'react';
import CookBookService from '../services/cookbook-api';

import EditCookbookForm from './forms/EditCookbookForm';
import Snackbar from 'material-ui/Snackbar';

const cbService = new CookBookService();

class EditCookbook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cookbook: {},
      open: false,
      errorMsg: ''
    };
  }

  componentDidMount() {
    cbService.getCookbook(this.props.match.params.id)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ cookbook: json.cookbook })
      });
  }

  render() {
    return (
      <div className='containter'>
        <EditCookbookForm cookbook={this.state.cookbook} />
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

export default EditCookbook;

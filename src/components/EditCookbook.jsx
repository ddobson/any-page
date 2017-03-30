import React from 'react';
import CookBookService from '../services/cookbook-api';

import EditCookbookForm from './forms/EditCookbookForm';
import Snackbar from 'material-ui/Snackbar';

const cbService = new CookBookService();
const ajaxErrorMsg = 'Something went wrong with your request. Please try again.'

class EditCookbook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cookbook: {},
      open: false,
      errorMsg: ''
    };

    this.updateCookbook = this.updateCookbook.bind(this);
  }

  componentDidMount() {
    cbService.getCookbook(this.props.match.params.id)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ cookbook: json.cookbook })
      })
      .catch(() => this.setState({ open: true, errorMsg: ajaxErrorMsg }));;
  }

  updateCookbook(data, form, valid) {
    if (!valid[0]) {
      this.setState({ open: true, errorMsg: valid[1] });
      return;
    }

    this.setState({ open: false, errorMsg: ''});

    cbService.updateCookbook(this.state.cookbook.id, data)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ cookbook: json.cookbook });
        form.reset();
      })
      .catch(() => this.setState({ open: true, errorMsg: ajaxErrorMsg }));
  }

  render() {
    return (
      <div className='containter'>
        <EditCookbookForm updateCookbook={this.updateCookbook} cookbook={this.state.cookbook} />
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

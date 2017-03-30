import React from 'react';
import CookBookService from '../services/cookbook-api';

// Components
import NewCookbookForm from './forms/NewCookbookForm';
import CircularProgress from 'material-ui/CircularProgress';
import CookbookSwatch from './CookbookSwatch'
import Snackbar from 'material-ui/Snackbar';


const cbService = new CookBookService();
const validationErrorMsg = 'The start page of a cookbook must preceed its end page. Try again.';
const ajaxErrorMsg = 'Sorry something went wrong. Please try again.';

class CookbookMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cookbooks: [],
      isLoading: true,
      errorMsg: '',
      open: false
    }

    this.handleNewCb = this.handleNewCb.bind(this);
    this.handleDestroyCb = this.handleDestroyCb.bind(this);
  }

  componentDidMount() {
    this.setState({ open: false, errorMsg: '' });

    cbService.getCookbooks()
      .then((response) => response.json())
      .then((json) => {
        const cookbooks = this.state.cookbooks.slice()
          json.cookbooks.forEach((cookbook) => cookbooks.push(cookbook));

        this.setState({ cookbooks, isLoading: false });
      })
      .catch(() => this.setState({ open: true, errorMsg: ajaxErrorMsg }));
  }

  handleNewCb(formData, form, valid) {
    if (!valid) {
      this.setState({ open: true, errorMsg: validationErrorMsg })
      return;
    }

    // SANATIZE STATE TO PREVENT SNACKBAR FROM OPENING
    // ON SECOND TRY AFTER A VALIDATION ERROR
    this.setState({ open: false, errorMsg: '' })

    cbService.createCookbook(formData)
      .then((response) => response.json())
      .then((json) => {
        const cookbooks = this.state.cookbooks.slice()
          cookbooks.push(json.cookbook);

        this.setState({ cookbooks })
        form.reset();
      })
      .catch(() => this.setState({ open: true, errorMsg: ajaxErrorMsg }));
  }

  handleDestroyCb(id) {
    cbService.destroyCookbook(id)
      .then(() => {
        this.setState( {isLoading: true} )
        cbService.getCookbooks()
          .then((response) => response.json())
          .then((json) => {
            this.setState({ cookbooks: json.cookbooks, isLoading: false });
          })
          .catch(() => this.setState({ open: true, errorMsg: ajaxErrorMsg }));
      })
      .catch(() => this.setState({ open: true, errorMsg: ajaxErrorMsg }));
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
      swatches = cookbooks.map((cookbook, i) => <CookbookSwatch key={i} cookbook={cookbook} handleDestroyCb={this.handleDestroyCb} />);
    }

    return (
      <div className='containter'>
        <div>
          { content }
        </div>
        <div>
          { swatches }
        </div>
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

export default CookbookMenu;

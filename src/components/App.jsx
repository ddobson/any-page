import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import config from '../config';

// Components
import Navigation from './Navigation';
import Main from './Main';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    }

    this.handleAuth = this.handleAuth.bind(this);
    this.updateAuthStatus = this.updateAuthStatus.bind(this);
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  updateAuthStatus(status) {
    this.setState({ loggedIn: status })
  }

  handleAuth(action, data) {
    const baseUrl = config[process.env.NODE_ENV].api;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (data) {
      data = JSON.stringify(data);
    }

    switch (action) {
      case 'sign-up':
        return fetch(`${baseUrl}/sign-up`, {
          method: 'POST',
          headers: headers,
          body: data
        });
      case 'sign-in':
        return fetch(`${baseUrl}/sign-in`, {
          method: 'POST',
          headers: headers,
          body: data
        });
      default:

    }
  }

  render() {
    const loggedIn = this.state.loggedIn;

    return (
      <BrowserRouter>
        <div>
          <Navigation loggedIn={loggedIn} />
          <Main handleAuth={ this.handleAuth } updateAuthStatus={ this.updateAuthStatus } loggedIn={loggedIn} />
        </div>
      </BrowserRouter>
    )
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default App;

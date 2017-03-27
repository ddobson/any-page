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
      loggedIn: localStorage.getItem('token') ? true : false,
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

    if (data) {
      data = JSON.stringify(data);
    }

    switch (action) {
      case 'sign-up':
        headers.append('Content-Type', 'application/json');
        return fetch(`${baseUrl}/sign-up`, {
          method: 'POST',
          headers: headers,
          body: data
        });
      case 'sign-in':
        headers.append('Content-Type', 'application/json');
        return fetch(`${baseUrl}/sign-in`, {
          method: 'POST',
          headers: headers,
          body: data
        });
      case 'change-pw':
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Token token=${localStorage.getItem('token')}`);
        return fetch(`${baseUrl}/change-password/${localStorage.getItem('id')}`, {
          method: 'PATCH',
          headers: headers,
          body: data
        });
      case 'sign-out':
        headers.append('Authorization', `Token token=${localStorage.getItem('token')}`);
        return fetch(`${baseUrl}/sign-out/${localStorage.getItem('id')}`, {
          method: 'DELETE',
          headers: headers,
        });
      default:

    }
  }

  render() {
    const loggedIn = this.state.loggedIn;

    return (
      <BrowserRouter>
        <div>
          <Navigation loggedIn={loggedIn} handleAuth={ this.handleAuth } updateAuthStatus={ this.updateAuthStatus } />
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

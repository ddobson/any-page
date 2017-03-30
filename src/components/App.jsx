import React from 'react';
import { HashRouter } from 'react-router-dom';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AuthService from '../services/AuthService';

// Components
import Navigation from './Navigation';
import Main from './Main';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: localStorage.getItem('token') ? true : false,
    }

    this.authService = new AuthService();
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
    return this.authService.handleAuth(action, data);
  }

  render() {
    const loggedIn = this.state.loggedIn;

    return (
      <HashRouter>
        <div>
          <Navigation loggedIn={loggedIn} handleAuth={ this.handleAuth } updateAuthStatus={ this.updateAuthStatus } />
          <Main handleAuth={ this.handleAuth } updateAuthStatus={ this.updateAuthStatus } loggedIn={loggedIn} />
        </div>
      </HashRouter>
    )
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default App;

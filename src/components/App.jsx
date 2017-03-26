import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Components
import Navigation from './Navigation';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    }
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  render() {
    const loggedIn = this.state.loggedIn;

    return (
      <BrowserRouter>
        <div>
          <Navigation loggedIn={loggedIn} />
        </div>
      </BrowserRouter>
    )
  }
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

export default App;

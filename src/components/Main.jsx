import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Welcome from './Welcome';
import CookbookMenu from './CookbookMenu';
import SignUpForm from './forms/SignUpForm';
import SignInForm from './forms/SignInForm';

class Main extends React.Component {
  render() {
    return (
      <div id="main">
        <Route exact={true} path="/" component={Welcome} />
        <Route exact={true} path="/cookbooks" component={CookbookMenu} />
        <Route exact path="/sign-up" render={() => (
          this.props.loggedIn ? (
            <Redirect to="/cookbooks"/>
          ) : (
            <SignUpForm handleAuth={ this.props.handleAuth } updateAuthStatus={ this.props.updateAuthStatus }/>
          )
        )}/>
        <Route exact path="/sign-in" render={() => (
          this.props.loggedIn ? (
            <Redirect to="/cookbooks"/>
          ) : (
            <SignInForm handleAuth={ this.props.handleAuth } updateAuthStatus={ this.props.updateAuthStatus }/>
          )
        )}/>
      {/*}<Route exact={true} path="/sign-in" component={SignInForm} handleAuth={this.props.handleAuth} />*/}
      </div>
    )
  }
}

export default Main;

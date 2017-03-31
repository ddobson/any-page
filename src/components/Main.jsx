import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Welcome from './Welcome';
import CookbookMenu from './CookbookMenu';
import CookbookDetail from './CookbookDetail';
import EditCookbook from './EditCookbook';
import SignUpForm from './forms/SignUpForm';
import SignInForm from './forms/SignInForm';
import ChangePwForm from './forms/ChangePwForm';
import RecipeDetail from './RecipeDetail';
import NotFound from './NotFound';

class Main extends React.Component {
  render() {
    return (
      <div id='main'>
        <Switch>
          <Route exact={true} path='/' component={Welcome} />
          <Route exact={true} path='/cookbooks' render={props => (
            this.props.loggedIn ? (
              <CookbookMenu {...props} loggedIn={ this.props.loggedIn } />
            ) : (
              <Redirect to='/'/>
            )
          )}/>
          <Route exact={true} path='/cookbooks/:id' render={props => (
            this.props.loggedIn ? (
              <CookbookDetail {...props} loggedIn={ this.props.loggedIn } />
            ) : (
              <Redirect to='/'/>
            )
          )}/>
          <Route exact={true} path='/cookbooks/:id/edit' render={props => (
            this.props.loggedIn ? (
              <EditCookbook {...props} loggedIn={ this.props.loggedIn } />
            ) : (
              <Redirect to='/'/>
            )
          )}/>
          <Route exact={true} path='/recipes/:id' component={RecipeDetail} />
          <Route exact={true} path='/sign-up' render={() => (
              <SignUpForm handleAuth={ this.props.handleAuth } />
          )}/>
          <Route exact path='/sign-in' render={props => (
            this.props.loggedIn ? (
              <Redirect {...props} to='/cookbooks'/>
            ) : (
              <SignInForm handleAuth={ this.props.handleAuth } updateAuthStatus={ this.props.updateAuthStatus }/>
            )
          )}/>
          <Route exact={true} path='/change-pw' render={() => (
            <ChangePwForm handleAuth={ this.props.handleAuth } />
          )}/>
          <Route exact={true} path='/sign-out' render={() => (
            <Redirect to='/'/>
          )}/>
          <Route exact={true} path='/cookbooks/sign-out' render={() => (
            <Redirect to='/'/>
          )}/>
          <Route exact={true} path='/recipes/sign-out' render={() => (
            <Redirect to='/'/>
          )}/>
          <Route exact={true} path='/cookbooks/:id/sign-out' render={() => (
            <Redirect to='/'/>
          )}/>
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default Main;

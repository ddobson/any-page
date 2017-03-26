import React from 'react';
import { Route } from 'react-router-dom';

import Welcome from './Welcome';
import CookbookMenu from './CookbookMenu';
import SignUpForm from './forms/SignUpForm';
import SignInForm from './forms/SignInForm';

class Main extends React.Component {
  render() {
    return (
      <div id="main">
        <Route exact={true} path="/" component={Welcome} />
        <Route exact={true} path="/sign-up" component={SignUpForm} />
        <Route exact={true} path="/sign-in" component={SignInForm} />
        <Route exact={true} path="/cookbooks" component={CookbookMenu} />
      </div>
    )
  }
}

export default Main;

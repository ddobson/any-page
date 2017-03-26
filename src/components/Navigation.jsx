import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

class Navigation extends React.Component {
  render() {
    const loggedIn = this.props.loggedIn;
    const iconStyle = { margin: '9px 0 0' }
    const buttonStyle = {
      backgroundColor: 'transparent',
      color: '#fff',
      margin: '12px 0 0'
    };

    if (!loggedIn) {
      return (
        <AppBar title="Any Page" showMenuIconButton={false}>
          <Link to={'/sign-up'}>
            <FlatButton style={buttonStyle} label="Sign Up" />
          </Link>
          <Link to={'/sign-in'}>
            <FlatButton style={buttonStyle} label="Sign In" />
          </Link>
        </AppBar>
      )
    }
    return (
      <AppBar title="Any Page" showMenuIconButton={false}>
        <IconMenu
          iconButtonElement={<IconButton style={iconStyle} iconClassName="fa fa-user-o" />}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem primaryText="Change Password" />
          <MenuItem primaryText="Sign out" />
        </IconMenu>
      </AppBar>
    )
  }
}

export default Navigation;

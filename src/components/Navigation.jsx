import React from 'react';
import { Link } from 'react-router-dom';

// Components
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    this.props.handleAuth('sign-out')
      .then(() => {
        localStorage.clear();
        this.props.updateAuthStatus(false);
      })
      .catch(console.error);
  }

  render() {
    const loggedIn = this.props.loggedIn;
    const titleLink = <Link className='title-link' to='/'>CookbookNook</Link>
    const icon = <IconButton style={{ margin: '9px 0 0', color: '#fff' }} iconClassName='fa fa-user-o' />
    const buttonStyle = {
      backgroundColor: 'transparent',
      color: '#fff',
      margin: '12px 0 0'
    };

    if (!loggedIn) {
      return (
        <AppBar title={titleLink} showMenuIconButton={false}>
          <Link to={'/sign-up'}>
            <FlatButton style={buttonStyle} label='Sign Up' />
          </Link>
          <Link to={'/sign-in'}>
            <FlatButton style={buttonStyle} label='Sign In' />
          </Link>
        </AppBar>
      )
    }
    return (
      <AppBar title={titleLink} showMenuIconButton={false}>
        <IconMenu
          iconButtonElement={icon}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <Link to='/change-pw' style={ { textDecoration: 'none' } } >
            <MenuItem primaryText='Change Password' />
          </Link>
          <MenuItem primaryText='Sign out' onTouchTap={ this.handleSignOut } />
        </IconMenu>
      </AppBar>
    )
  }
}

export default Navigation;

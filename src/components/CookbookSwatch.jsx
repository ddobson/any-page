import React from 'react';
import { Link } from 'react-router-dom';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

class CookbookSwatch extends React.Component {
  destroyClick(event) {
    event.preventDefault();
    this.props.handleDestroyCb(this.props.cookbook.id);
  }

  render() {
    const content = (
      <div className='swatch-wrap'>
        <div>
          <h3>{this.props.cookbook.title}</h3>
          <i className='fa fa-book fa-5x' aria-hidden='true'></i>
        </div>
        <Link to={`/cookbooks/${this.props.cookbook.id}`}>
          <RaisedButton label='Recipes' secondary={ true } />
        </Link>
        <br />
        <Link to={`/cookbooks/${this.props.cookbook.id}/edit`}>
          <RaisedButton style={{ marginTop: '7px' }} label="Edit" secondary={ true } />
        </Link>
        <br />
        <RaisedButton style={{ marginTop: '7px' }} label='Delete' onTouchTap={ this.destroyClick.bind(this) } secondary={ true } />
      </div>
    );

    return (
      <Paper className='column col-12' style={ { marginBottom: '15px' } } children={ content } />
    )
  }
}

export default CookbookSwatch;

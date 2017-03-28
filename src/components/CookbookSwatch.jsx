import React from 'react';
import { Link } from 'react-router-dom';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

class CookbookSwatch extends React.Component {
  render() {
    const content = (
      <div className='swatch-wrap'>
        <i className='fa fa-book fa-5x' aria-hidden='true'></i>
        <Link to={`/cookbooks/${this.props.cookbook.id}`}>
          <RaisedButton label={ this.props.cookbook.title } secondary={ true } />
        </Link>
      </div>
    );

    return (
      <Paper className='col-xs-12 col-md-3 col-lg-2' style={ { maxWidth: '250px', margin: '15px' } } children={ content } />
    )
  }
}

export default CookbookSwatch;

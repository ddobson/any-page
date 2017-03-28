import React from 'react';
import { Link } from 'react-router-dom';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

class RecipeSwatch extends React.Component {
  render() {
    const content = (
      <div className='swatch-wrap'>
        <i className='fa fa-book fa-5x' aria-hidden='true'></i>
        <Link to={`/recipes/${this.props.recipe.id}`}>
          <RaisedButton label={ this.props.recipe.name } secondary={ true } />
        </Link>
      </div>
    );

    return (
      <Paper className='column col-12' style={ { marginBottom: '15px' } } children={ content } />
    )
  }
}

export default RecipeSwatch;

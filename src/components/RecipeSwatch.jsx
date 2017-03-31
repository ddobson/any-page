import React from 'react';
import { Link } from 'react-router-dom';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

class RecipeSwatch extends React.Component {
  destroyClick(event) {
    event.preventDefault();
    this.props.handleDestroyRecipe(this.props.recipe.id);
  }

  render() {
    const content = (
      <div className='swatch-wrap'>
        <h3>{ this.props.recipe.name }</h3>
        <div>
          <i className='fa fa-cutlery fa-5x' aria-hidden='true'></i>
        </div>
        <Link to={ `/recipes/${this.props.recipe.id}` }>
          <RaisedButton label='Comment or Edit' secondary={ true } />
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

export default RecipeSwatch;

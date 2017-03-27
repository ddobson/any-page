import React from 'react';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

class CookbookSwatch extends React.Component {
  render() {
    const content = (
      <div className="swatch-wrap">
        <i className="fa fa-book fa-5x" aria-hidden="true"></i>
        <RaisedButton label={ this.props.cookbook.title } secondary={ true } />
      </div>
    );

    return (
      <Paper className="col-xs-12 col-md-3 col-lg-2" style={ { maxWidth: '250px', margin: '15px' } } children={ content } />
    )
  }
}

export default CookbookSwatch;

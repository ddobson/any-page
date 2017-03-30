import React from 'react';

class Welcome extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='columns'>
          <div className='column col-xs-12'>
            <h1 className='center'>Welcome to Cookbook Nook</h1>
            <p className='center'>Coobook Nook is a place to store your cookbook collection and get random recipe suggestions.</p>
            <p className='center'>Enter the pages in your cookbook where recipes occur and we'll give you a random page.</p>
            <p className='center'>If you like the recipe, save it and we'll never suggest that one again. We promise!</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Welcome;

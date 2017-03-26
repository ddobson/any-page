import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
    };
  }

  render() {
    return (
      <h1>APP COMPONENT</h1>
    );
  }
}

export default App;

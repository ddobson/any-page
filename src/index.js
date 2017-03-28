import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './components/App';
import './styles/spectre.min.css'
import './styles/index.css';

injectTapEventPlugin();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './components/App';
import './styles/index.css';

ReactDOM.render(
  <div>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </div>,
  document.getElementById('root')
);

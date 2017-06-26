import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { initMap } from './Map';
import './css/index.css';

window.initMap = initMap;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
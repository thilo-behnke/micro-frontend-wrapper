import React from 'react';
import ReactDOM from 'react-dom';
import Wrapper from './Wrapper';
import reportWebVitals from './reportWebVitals';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

if(!window.MICRO_FRONTEND_WRAPPER) {
    window.MICRO_FRONTEND_WRAPPER = {};
}

ReactDOM.render(
  <React.StrictMode>
    <Wrapper />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

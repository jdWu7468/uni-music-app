import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from "./plugins/axios";
import reportWebVitals from './reportWebVitals';

React.Component.prototype.$axios = axios;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

//模块热替换的API
if(module.hot){
  module.hot.accept();
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

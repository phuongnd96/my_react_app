import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { MyWebPage } from '../src/components/MyWebPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
require('dotenv').config();

ReactDOM.render(
  <BrowserRouter>
    <MyWebPage baseUrl={process.env.REACT_APP_BASE_URL_PROD} />
  </BrowserRouter>,
  document.getElementById('root')
);


serviceWorker.register();

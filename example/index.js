import './main.scss';

import React from 'react';
import { render } from 'react-dom';
import {
  Router,
  browserHistory,
  Route,
} from 'react-router';

import App from './components/App';
import FormView from './components/FormView';

render(
  <Router history={browserHistory}>
    <Route path={'/'} component={App}>
      <Route path={'form'} component={FormView} />
    </Route>
  </Router>,
  document.getElementById('app')
);

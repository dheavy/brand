/**
 * MyPleasure | "brand"
 * --------------------
 * App entry point.
 */

import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import App from './containers/App';
import {render} from 'react-dom';
import React from 'react';

require('!style!css!sass!../node_modules/normalize.scss/normalize.scss');
require('!style!css!sass!./styles/definitions.scss');
require('!style!css!sass!./styles/foundation.scss');
require('!style!css!sass!./styles/mypleasure.scss');

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('mp')
);

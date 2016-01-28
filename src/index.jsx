/**
 * MyPleasure | "brand"
 * --------------------
 * App entry point.
 */

import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {nextScreen} from './actions';
import App from './containers/App';
import {render} from 'react-dom';
import {Map} from 'immutable';
import React from 'react';

import {
  MAX_SECTIONS,
  INITIAL_STATE
} from './constants/Sections';

require('!style!css!sass!../node_modules/normalize.scss/normalize.scss');
require('!style!css!sass!./styles/definitions.scss');
require('!style!css!sass!./styles/foundation.scss');
require('!style!css!sass!./styles/mypleasure.scss');

const isMobile = document.getElementsByTagName('html')[0].classList.contains('mobile');
const content = require('./content.json');
const store = configureStore(INITIAL_STATE.merge({isMobile}), Map(content));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

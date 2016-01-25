/**
 * MyPleasure | "brand"
 * --------------------
 * Configure app store.
 */

import {createStore, compose, applyMiddleware} from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';

// Create composed store with thunk middleware
// and Redux dev tools if available on client.
const storeWithMiddleware = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f,
  applyMiddleware(thunk)
)(createStore);

export default function configureStore(initialState) {
  const store = storeWithMiddleware(reducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

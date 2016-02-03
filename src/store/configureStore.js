/**
 * MyPleasure | "brand"
 * --------------------
 * Configure app store.
 */

import {createStore, compose, applyMiddleware} from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';
import {Map} from 'immutable';

const storeWithMiddleware = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f,
  applyMiddleware(thunk)
)(createStore);

export default function configureStore(initialState = null, sectionsFromJSON, configFromJSON) {
  const store = storeWithMiddleware(
    reducer,
    initialState.merge(
      sectionsFromJSON.merge(
        configFromJSON
      )
    )
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

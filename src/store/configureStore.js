/**
 * MyPleasure | "brand"
 * --------------------
 * Configure app store.
 */

import {createStore, compose, applyMiddleware} from 'redux';
import reducer from '../reducer';
import thunk from 'redux-thunk';
import {Map} from 'immutable';

export default function configureStore(initialState, sections, conf) {
  const store = applyMiddleware(thunk)(createStore)(
    reducer, initialState.merge(sections.merge(conf))
  );

  if (module.hot) {
    module.hot.accept('../reducer', () => {
      const nextReducer = require('../reducer');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

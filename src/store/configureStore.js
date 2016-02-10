/**
 * MyPleasure | "brand"
 * --------------------
 * Configure app store.
 */

import {createStore, compose, applyMiddleware} from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';
import {Map} from 'immutable';

export default function configureStore(initialState, sections, conf) {
  const store = applyMiddleware(thunk)(createStore)(
    reducer, initialState.merge(sections.merge(conf))
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

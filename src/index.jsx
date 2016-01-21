import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import App from './components/App';
import ReactDOM from 'react-dom';
import reducer from './reducer';
import thunk from 'redux-thunk';
import React from 'react';

const storeWithMiddleware = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f,
  applyMiddleware(thunk)
)(createStore);

const store = storeWithMiddleware(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

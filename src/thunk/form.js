/**
 * MyPleasure | "brand"
 * --------------------
 * Async action (thunk) for dealing with form request.
 */

import fetchJsonp from 'fetch-jsonp';

import {
  FORM_REQUEST_BEGIN,
  FORM_REQUEST_SUCCESS,
  FORM_REQUEST_ERROR
} from '../constants/ActionTypes';

function formRequestBegin({formName}) {
  return {
    type: FORM_REQUEST_BEGIN,
    form: formName
  };
}

function formRequestSuccess(formName, message) {
  return {
    type: FORM_REQUEST_SUCCESS,
    formName: formName,
  };
}

function formRequestError(formName, message) {
  return {
    type: FORM_REQUEST_ERROR,
    formName: formName,
    message: message
  };
}

function action(formAction, email) {
  return `${formAction}&EMAIL=${email}`;
}

export default function submitForm({email, formAction, formName}) {
  return dispatch => {
    dispatch(formRequestBegin({formName}));

    return fetchJsonp(action(formAction, email), {method: 'GET', jsonpCallback: 'c'})
      .then(response => response.json())
      .then(response => {
        response.result === 'success' ?
          dispatch(formRequestSuccess(formName, response.msg)) :
          dispatch(formRequestError(formName, response.msg));
      })
      .catch(error => console.log(error))
  };
}

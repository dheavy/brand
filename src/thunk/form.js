/**
 * MyPleasure | "brand"
 * --------------------
 * Async action (thunk) for dealing with form request.
 */

import fetchJsonp from 'fetch-jsonp';

import {
  FORM_REQUEST_BEGIN,
  FORM_REQUEST_END
} from '../constants/ActionTypes';

function formRequestBegin({formName}) {
  return {
    type: FORM_REQUEST_BEGIN,
    form: formName
  };
}

function formRequestEnd({formName, response}) {
  return {
    type: FORM_REQUEST_END,
    formName: formName,
    result: response.result,
    msg: response.msg
  };
}

export default function submitForm({email, formAction, formName}) {
  return dispatch => {
    dispatch(formRequestBegin({formName}));

    return fetchJsonp(formAction, {method: 'GET'})
      .then(response => response.json())
      .then(response => {
        console.log('response', response);
        dispatch(formRequestEnd({formName, response}));
      })
      .catch(error => console.log(error))
  };
}

import fetch from 'isomorphic-fetch';

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

export function submitForm({email, formAction, formName}) {
  return function(dispatch) {
    dispatch(formRequestBegin({formName}));

    return fetch(formAction)
      .then(res => res.json())
      .then(response => {
        console.log('response', response);
        dispatch(formRequestEnd({formName, response}));
      });
  };
}

import * as types from '../constants/ActionTypes';

export function nextScreen(section) {
  return {type: types.NEXT_SCREEN, currentSection: ++section }
}

export function submitEmail() {
  return {type: types.SUBMIT_EMAIL}
}

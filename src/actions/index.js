import * as types from '../constants/ActionTypes';

export function nextScreen(section) {
  return {type: types.NEXT_SCREEN, currentSection: ++section };
}

export function submitEmail() {
  return {type: types.SUBMIT_EMAIL};
}

export function resize({width, height}) {
  return {type: types.RESIZE, width: width, height: height};
}

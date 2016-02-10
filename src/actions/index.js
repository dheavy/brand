import {
  NEXT_SCREEN,
  GOTO_SCREEN,
  RESIZE,
  UPDATE_INPUT_VALUE
} from '../constants/ActionTypes';

export function updateInputValue(newValue) {
  return {type: UPDATE_INPUT_VALUE, inputValue: newValue};
}

export function nextScreen(section) {
  return {type: NEXT_SCREEN, currentSection: ++section};
}

export function resize({width, height}) {
  return {type: RESIZE, width: width, height: height};
}

export function gotoScreen(id) {
  return {type: GOTO_SCREEN, id: id};
}

import {
  NEXT_SCREEN,
  RESIZE,
  UPDATE_INPUT_VALUE
} from '../constants/ActionTypes';

export submitForm from './form';

export function updateInputValue(newValue) {
  return {type: UPDATE_INPUT_VALUE, inputValue: newValue};
}

export function nextScreen(section) {
  return {type: NEXT_SCREEN, currentSection: ++section};
}

export function resize({width, height}) {
  return {type: RESIZE, width: width, height: height};
}

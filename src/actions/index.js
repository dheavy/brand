/**
 * MyPleasure | "brand"
 * --------------------
 * Action creators.
 */

import {
  UPDATE_EMAIL_VALIDITY,
  UPDATE_INPUT_VALUE,
  WARN_INVALID_EMAIL,
  NEXT_SCREEN,
  GOTO_SCREEN,
  RESIZE
} from '../constants/ActionTypes';

export function updateInputValue(newValue) {
  return {type: UPDATE_INPUT_VALUE, inputValue: newValue};
}

export function updateEmailValidity(email) {
  return {type: UPDATE_EMAIL_VALIDITY, email}
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

export function warnInvalidEmail(errorMessage) {
  return {type: WARN_INVALID_EMAIL, errorMessage};
}

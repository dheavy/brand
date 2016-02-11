/**
 * MyPleasure | "brand"
 * --------------------
 * Constants used throughout the app,
 * including initial state tree.
 */

import {Map, Set} from 'immutable';

export const MAX_SECTIONS = 3;
export const ASPECT_RATIO = 1.778125;
export const INITIAL_STATE = Map({
  currentSection: 0,
  maxSections: MAX_SECTIONS,
  aspectRatio: ASPECT_RATIO,
  sections: null,
  config: null,
  viewed: Set(),
  inputValue: '',
  request: Map({
    isEmailValid: false,
    requestSuccessful: false,
    requestFailed: false,
    fromForm: null,
    errorMessage: '',
    results: {}
  }),
  errors: {},
  thanks: {}
});

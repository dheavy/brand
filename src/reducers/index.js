/**
 * MyPleasure | "brand"
 * --------------------
 * Main reducer.
 */

import {
  NEXT_SCREEN,
  GOTO_SCREEN,
  RESIZE,
  UPDATE_INPUT_VALUE
} from '../constants/ActionTypes';

import {
  MAX_SECTIONS,
  INITIAL_STATE
} from '../constants/Sections';

import {Map, Set} from 'immutable';

function range(to) {
  return Array.apply(null, Array(to)).map((_, i) => i);
}

export default function landingPage(state = INITIAL_STATE, action) {
  switch (action.type) {
    // Ultimately removes current screen from view.
    // Update `currentSection` key, preventing it from exceeding
    // the maximum number of sections.
    // Update `viewed`: add ID/index of screen being removed
    // to the Set of `viewed` sections.
    case GOTO_SCREEN:
      const viewedSections = c => c === 0 ? [] : range(c);
      return state.merge(Map({
        currentSection: Math.min(action.id, MAX_SECTIONS),
        viewed: Set(viewedSections(action.id))
      }));

    case RESIZE:
      return state.merge(Map({width: action.width, height: action.height}));

    case UPDATE_INPUT_VALUE:
      return state.merge(Map({inputValue: action.inputValue}));

    default:
      return state;
  }
}


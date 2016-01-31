/**
 * MyPleasure | "brand"
 * --------------------
 * Main reducer.
 */

import {
  TOTAL_SECTIONS,
  NEXT_SCREEN,
  RESIZE,
  SUBMIT_EMAIL
} from '../constants/ActionTypes';

import {
  MAX_SECTIONS,
  INITIAL_STATE
} from '../constants/Sections';

import {Map} from 'immutable';


export default function landingPage(state = INITIAL_STATE, action) {
  switch (action.type) {
    // Ultimately removes current screen from view.
    // Update `currentSection` key, preventing it from exceeding
    // the maximum number of sections.
    // Update `viewed`: add ID/index of screen being removed
    // to the Set of `viewed` sections.
    case NEXT_SCREEN:
      return state.merge(Map({
        currentSection: Math.min(action.currentSection, MAX_SECTIONS),
        viewed: state.get('viewed').add(action.currentSection - 1)
      }));

    case RESIZE:
      return state.merge(Map({width: action.width, height: action.height}));

    default:
      return state;
  }
}


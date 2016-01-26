/**
 * MyPleasure | "brand"
 * --------------------
 * Main reducer.
 */

import {
  TOTAL_SECTIONS,
  NEXT_SCREEN,
  SUBMIT_EMAIL
} from '../constants/ActionTypes';

import {
  MAX_SECTIONS,
  INITIAL_STATE
} from '../constants/Sections';

import {Map} from 'immutable';


export default function landingPage(state = INITIAL_STATE, action) {
  switch (action.type) {
    case NEXT_SCREEN:
      return state.merge(Map({
        currentSection: Math.min(action.currentSection, MAX_SECTIONS)
      }));

    default:
      return state;
  }
}


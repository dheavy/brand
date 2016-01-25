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

import {MAX_SECTIONS} from '../constants/Sections';

import {Map} from 'immutable';

const initialState = Map({
  currentSection: 0,
  maxSections: MAX_SECTIONS
});

export default function landingPage(state = initialState, action) {
  switch (action.type) {
    case NEXT_SCREEN:
      return state.merge(Map({
        currentSection: Math.min(action.currentSection, MAX_SECTIONS)
      }));

    default:
      return state;
  }
}


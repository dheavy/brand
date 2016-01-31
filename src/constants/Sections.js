import {Map, Set} from 'immutable';

export const MAX_SECTIONS = 3;
export const ASPECT_RATIO = 1.778125;

export const INITIAL_STATE = Map({
  currentSection: 0,
  maxSections: MAX_SECTIONS,
  aspectRatio: ASPECT_RATIO,
  sections: null,
  viewed: Set()
});

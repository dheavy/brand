import {Map} from 'immutable';

export const MAX_SECTIONS = 3;
export const INITIAL_STATE = Map({
  currentSection: 0,
  maxSections: MAX_SECTIONS,
  sections: null
});

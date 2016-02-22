/**
 * MyPleasure | "brand"
 * --------------------
 * App reducer.
 */

import {
  UPDATE_EMAIL_VALIDITY,
  UPDATE_INPUT_VALUE,
  WARN_INVALID_EMAIL,
  FORM_REQUEST_SUCCESS,
  FORM_REQUEST_ERROR,
  NEXT_SCREEN,
  GOTO_SCREEN,
  RESIZE
} from '../constants/ActionTypes';

import {
  MAX_SECTIONS,
  INITIAL_STATE
} from '../constants/Sections';

import {Map, Set} from 'immutable';

const sectionNames = [
  '0 - First screen',
  '1 - Enjoy your privacy',
  '2 - Add videos from all around the web',
  '3 - Last screen'
];

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

      // Track changes.
      mixpanel.track('User changes screen.', {
        from_screen: sectionNames[state.get('currentSection')],
        to_screen: sectionNames[action.id]
      });
      ga('send', 'event', 'Screen change', 'change', '', action.id);

      return state.merge(Map({
        currentSection: Math.min(action.id, MAX_SECTIONS),
        viewed: Set(viewedSections(action.id))
      }));

    case RESIZE:
      return state.merge(Map({width: action.width, height: action.height}));

    case UPDATE_INPUT_VALUE:
      return state.merge(Map({inputValue: action.inputValue}));

    case UPDATE_EMAIL_VALIDITY:
      return state.merge(Map({
        request: state.get('request').merge(Map({
          isEmailValid: /(?:.+)@(?:.+){2,}\.(?:.+){2,}/.test(action.email),
          errorMessage: ''
        }))
      }));

    case FORM_REQUEST_SUCCESS:
      // Track which form transformed user.
      const formId = parseInt(action.formName.substr(action.formName.length - 1));
      mixpanel.track('User transformed!', {from_screen: sectionNames[formId]});

      return state.merge(Map({
        request: state.get('request').merge(Map({
          isEmailValid: true,
          errorMessage: '',
          requestFailed: false,
          requestSuccessful: true,
          fromForm: action.formName
        }))
      }));

    case FORM_REQUEST_ERROR:
      return state.merge(Map({
        request: state.get('request').merge(Map({
          errorMessage: action.message,
          requestFailed: true,
          requestSuccessful: false
        }))
      }));

    case WARN_INVALID_EMAIL:
      return state.merge(Map({
        request: state.get('request').merge(Map({
          errorMessage: action.errorMessage
        }))
      }));

    default:
      return state;
  }
}


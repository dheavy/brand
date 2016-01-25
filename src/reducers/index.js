/**
 * MyPleasure | "brand"
 * --------------------
 * Main reducer.
 */

import {combineReducer} from 'redux';
import landingPage from './landingPage';

const reducer = combineReducer({landingPage});

export default reducer;

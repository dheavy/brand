/**
 * MyPleasure | "brand"
 * --------------------
 * Stateless, functional component for providers sections.
 */

import ImmutablePropTypes from 'react-immutable-proptypes';
import MotionScreen from './MotionScreen';
import React, {PropTypes} from 'react';

const ProvidersScreen = props => {
  return (
    <div style={props.style}>ProvidersScreen</div>
  );
};

ProvidersScreen.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  providersNormal: ImmutablePropTypes.list.isRequired,
  providersNaughty: ImmutablePropTypes.list.isRequired,
  cta: PropTypes.string.isRequired
};

export default MotionScreen(ProvidersScreen);

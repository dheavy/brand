/**
 * MyPleasure | "brand"
 * --------------------
 * Stateless, functional component for the "privacy" screen.
 */

import MotionComponent from './MotionComponent';
import React, {PropTypes} from 'react';

const PrivacyScreen = props => {
  return (
    <div style={props.style}>PrivacyScreen</div>
  );
};

PrivacyScreen.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired
};

export default MotionComponent(PrivacyScreen);

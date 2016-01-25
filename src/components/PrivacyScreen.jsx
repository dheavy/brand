/**
 * MyPleasure | "brand"
 * --------------------
 * Stateless, functional component for the "privacy" screen.
 */

import React, {PropTypes} from 'react';

const PrivacyScreen = ({title, subtitle, cta}) => {
  return (
    <div>PrivacyScreen</div>
  );
};

PrivacyScreen.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired
};

export default PrivacyScreen;

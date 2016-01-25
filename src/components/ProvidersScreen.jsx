/**
 * MyPleasure | "brand"
 * --------------------
 * "Providers" screen.
 */

import ImmutablePropTypes from 'react-immutable-proptypes';
import React, {PropTypes} from 'react';

const ProvidersScreen = ({title, subtitle, providersNormal, providersNaughty, cta}) => {
  return (
    <div>ProvidersScreen</div>
  );
};

ProvidersScreen.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  providersNormal: ImmutablePropTypes.list.isRequired,
  providersNaughty: ImmutablePropTypes.list.isRequired,
  cta: PropTypes.string.isRequired
};

export default ProvidersScreen;

import ImmutablePropTypes from 'react-immutable-proptypes';
import PureComponent from './PureComponent';
import React, {PropTypes} from 'react';

export default class ProvidersScreen extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    providersNormal: ImmutablePropTypes.list.isRequired,
    providersNaughty: ImmutablePropTypes.list.isRequired,
    cta: PropTypes.string.isRequired
  };

  render() {
    return <div>ProvidersScreen</div>;
  }
}

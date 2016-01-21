import PureComponent from './PureComponent';
import React, {PropTypes} from 'react';

export default class PrivacyScreen extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    cta: PropTypes.string.isRequired
  };

  render() {
    return <div>PrivacyScreen</div>
  }
}

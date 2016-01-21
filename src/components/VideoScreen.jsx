import PureComponent from './PureComponent';
import React, {PropTypes} from 'react';

export default class VideoScreen extends PureComponent {
  static propTypes = {
    video: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    cta: PropTypes.string.isRequired,
    next: PropTypes.string
  };

  render() {
    return <div>VideoScreen</div>
  }
}

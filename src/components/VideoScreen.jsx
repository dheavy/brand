/**
 * MyPleasure | "brand"
 * --------------------
 * Stateless, functional component for fullscreen video sections.
 */

import MotionComponent from './MotionComponent';
import {Motion, spring} from 'react-motion';
import React, {PropTypes} from 'react';

const VideoScreen = props => {
  return (
    <section className="screen video" style={props.style}>VideoScreen</section>
  );
};

VideoScreen.propTypes = {
  video: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired,
  next: PropTypes.string
};

export default MotionComponent(VideoScreen);

/**
 * MyPleasure | "brand"
 * --------------------
 * Stateless, functional component for fullscreen video sections.
 */

import React, {PropTypes} from 'react';

const VideoScreen = ({video, title, subtitle, cta, next = null}) => {
  return (
    <section className="screen video">VideoScreen</section>
  );
};

VideoScreen.propTypes = {
  video: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired,
  next: PropTypes.string
};

export default VideoScreen;

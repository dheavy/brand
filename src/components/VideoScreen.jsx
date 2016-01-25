/**
 * MyPleasure | "brand"
 * --------------------
 * Stateless, functional component for fullscreen video sections.
 */

import React, {PropTypes} from 'react';

const VideoScreen = props => {
  return (
    <section className="screen video">VideoScreen</section>
  )
};

VideoScreen.propTypes = {
  video: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired,
  next: PropTypes.string
};

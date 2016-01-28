/**
 * MyPleasure | "brand"
 * --------------------
 * Stateless, functional component for fullscreen video sections.
 */

import ImmutablePropTypes from 'react-immutable-proptypes';
import FullscreenVideo from './FullscreenVideo';
import MotionComponent from './MotionComponent';
import {Motion, spring} from 'react-motion';
import React, {PropTypes} from 'react';

const checkIfStart = (viewed, id) => {
  return (viewed.size === 0 && id === 0) || (viewed.contains(id));
}

const VideoScreen = props => {
  return (
    <section className="screen video" style={props.style}>
      {props.video &&
        <FullscreenVideo
          video={props.video}
          posters={props.posters}
          play={checkIfStart(props.viewed, props.id)}
          isMobile={props.isMobile}
        />
      }
      <div className="logo">MyPleasure</div>
      <div className="row center">
        <h1 className="column small-centered small-1 medium-20 large-20 title">{props.title}</h1>
        <h2 className="column small-centered small-1 medium-20 large-20 subtitle">{props.subtitle}</h2>
      </div>
      {props.next &&
      <div className="btn-next">
        <div className="column small-centered small-1 medium-20 large-20" onClick={props.nextHandler}>{props.next}</div>
      </div>}
    </section>
  );
};

VideoScreen.propTypes = {
  posters: ImmutablePropTypes.list.isRequired,
  video: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired,
  next: PropTypes.string
};

export default MotionComponent(VideoScreen);

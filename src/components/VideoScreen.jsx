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
import Logo from './Logo';

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
      <Logo />
      <div className="row center-full">
        <h1 className="column small-centered small-20 medium-20 large-20 title">{props.title}</h1>
        <h2 className="column small-centered small-20 medium-20 large-20 subtitle">{props.subtitle}</h2>
        <div className="column small-centered small-20 medium-20 large-20">
          <form className="column small-centered small-6 medium-6 large-6">
            <div className="input-group">
              <input className="input-group-field" type="email" placeholder="Email" />
              <div className="input-group-button">
                <input type="submit" className="button" value={props.cta} />
              </div>
            </div>
          </form>
        </div>
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

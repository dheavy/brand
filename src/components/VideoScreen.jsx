/**
 * MyPleasure | "brand"
 * --------------------
 * Stateless, functional component for fullscreen video sections.
 */

import ImmutablePropTypes from 'react-immutable-proptypes';
import FullscreenVideo from './FullscreenVideo';
import MotionScreen from './MotionScreen';
import {Motion, spring} from 'react-motion';
import React, {PropTypes} from 'react';
import Form from './Form';
import Logo from './Logo';

const checkIfStart = (viewed, id) => {
  return viewed.size === 0 || id === 0 || viewed.size === id;
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
          width={props.width}
          height={props.height}
          aspectRatio={props.aspectRatio}
        />
      }
      <Logo />
      <div className="row center-full">
        <h1 className="column small-centered small-20 medium-20 large-20 title">{props.title}</h1>
        <h2 className="column small-centered small-20 medium-20 large-20 subtitle">{props.subtitle}</h2>
        <div className="row">
          <Form
            formName={`form-${props.id}`}
            formData={props.form}
            classNames={"column small-centered small-15 medium-10 large-8"}
            cta={props.cta}
            inputValue={props.inputValue}
            inputChange={props.inputChange}
            submit={props.submitForm}
          />
        </div>
      </div>
      {props.next &&
      <div className="btn-next">
        <div className="column small-centered small-20 medium-20 large-20" onClick={props.nextHandler}>{props.next}</div>
      </div>}
    </section>
  );
};

VideoScreen.propTypes = {
  posters: ImmutablePropTypes.list.isRequired,
  aspectRatio: PropTypes.number.isRequired,
  video: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired,
  next: PropTypes.string
};

export default MotionScreen(VideoScreen);

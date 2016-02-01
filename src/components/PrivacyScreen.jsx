/**
 * MyPleasure | "brand"
 * --------------------
 * Stateless, functional component for the "privacy" screen.
 */

import MotionComponent from './MotionComponent';
import React, {PropTypes} from 'react';
import Form from './Form';
import Logo from './Logo';

const PrivacyScreen = props => {
  return (
    <section className="screen privacy" style={props.style}>
      <Logo />
      <div className="row center-full">
        <div className="column medium-8 large-8 medium-offset-1 large-offset-1">
          <div className="row">
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
          </div>
          <div className="row">
            <Form classNames={"column small-15 medium-15 large-15"} cta={props.cta} />
          </div>
        </div>
        <div className="column small-x medium-10 large-10">o</div>
      </div>
    </section>
  );
};

PrivacyScreen.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired
};

export default MotionComponent(PrivacyScreen);

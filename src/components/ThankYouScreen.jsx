/**
 * MyPleasure | "brand"
 * --------------------
 * "Thank you" screen.
 */

import React, {PropTypes} from 'react';
import Logo from './Logo';

const classNames = isVisible => {
  let className = 'screen thankyou';
  isVisible ? className += ' is-visible' : void(0);
  return className;
}

const ThankYouScreen = props => {
  return (
    <section className={classNames(props.visible)} style={props.style}>
      <Logo />
      <div className="row center-full">
        <h1 className="small-centered small-20 medium-10 large-10 title">{props.texts.title}</h1>
        <h2 className="small-centered small-20 medium-10 large-10 subtitle">{props.texts.subtitle}</h2>
      </div>
    </section>
  );
};

ThankYouScreen.propTypes = {
  visible: PropTypes.bool.isRequired,
  texts: PropTypes.object.isRequired
};

export default ThankYouScreen;

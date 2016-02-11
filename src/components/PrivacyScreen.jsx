/**
 * MyPleasure | "brand"
 * --------------------
 * Stateless, functional component for the "privacy" screen.
 */

import MotionScreen from './MotionScreen';
import React, {PropTypes} from 'react';
import Form from './Form';
import Logo from './Logo';

// Compute style for background feed image.
// Decide whether or not image is visible based on a simple condition:
// has the preceding screen been viewed and disappeared already?
const feedStyle = (id, viewed) => {
  let style = 'feed';
  if (viewed.contains(--id)) {
    style += ' is-visible';
  }
  return style;
}

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
          <div className="row form">
            <Form
              formName={`form-${props.id}`}
              formData={props.form}
              classNames={"column small-15 medium-20 large-15"}
              cta={props.cta}
              inputValue={props.inputValue}
              inputChange={props.inputChange}
              submit={props.submitForm}
              isEmailValid={props.formStatus.get('isEmailValid')}
              errorMessage={props.formStatus.get('errorMessage')}
            />
          </div>
        </div>
        <div className="column small-10 medium-10 large-10">
          <div className={feedStyle(props.id, props.viewed)}></div>
        </div>
      </div>
    </section>
  );
};

PrivacyScreen.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired
};

export default MotionScreen(PrivacyScreen);

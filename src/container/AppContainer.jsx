/**
 * MyPleasure | "brand"
 * --------------------
 * Components container.
 */

import CurrentScreenIndicator from '../components/CurrentScreenIndicator';
import ProvidersScreen from '../components/ProvidersScreen';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ThankYouScreen from '../components/ThankYouScreen';
import PrivacyScreen from '../components/PrivacyScreen';
import VideoScreen from '../components/VideoScreen';
import React, {Component, PropTypes} from 'react';
import * as LandingPageActions from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import submit from '../thunk/form';
import {debounce} from 'lodash';
import {List} from 'immutable';

let canUseWheel = true;
let usingWheelDelay = 2000;
let usingWheelTimer = null;

function mapStateToProps(state) {
  return {
    currentSection: state.get('currentSection'),
    maxSections: state.get('maxSections'),
    sections: state.get('sections'),
    thanks: state.get('thanks'),
    errors: state.get('errors'),
    config: state.get('config'),
    viewed: state.get('viewed'),
    isMobile: state.get('isMobile'),
    inputValue: state.get('inputValue'),
    width: state.get('width'),
    height: state.get('height'),
    aspectRatio: state.get('aspectRatio'),
    request: state.get('request')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LandingPageActions, dispatch)
  }
}

// Merge props to add the 'viewed' value
// (i.e. array referencing which screens have been viewed
// and should be removed).
function screenProps(props, inputValue, formStatus, viewed, form, submitForm, inputChange) {
  return Object.assign(
    {}, props, {inputValue, formStatus, viewed, form, submitForm, inputChange}
  );
}

// Merge props for 'Provider' screen, to transform arrays
// of providers into immutable Lists.
function providerScreenProps(props) {
  const providersNormal = List(props.providersNormal);
  const providersNaughty = List(props.providersNaughty);
  return Object.assign({}, props, {providersNormal, providersNaughty});
}

// Merge props for 'Video' screen, to transform array
// of posters into immutable list, and tell if this is a mobile
// device or not (influences whether the video is displayed).
function videoScreenProps(props, isMobile, width, height, aspectRatio) {
  const posters = List(props.posters);
  return Object.assign({}, props, {posters, isMobile, width, height, aspectRatio});
}

class AppContainer extends Component {

  static propTypes = {
    currentSection: PropTypes.number.isRequired,
    maxSections: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired,
    sections: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    viewed: ImmutablePropTypes.set.isRequired,
    aspectRatio: PropTypes.number.isRequired,
    inputValue: PropTypes.string,
    request: ImmutablePropTypes.map.isRequired
  };

  static contextTypes = {
    store: PropTypes.object
  };

  constructor(props, store) {
    super(props, store);
    this.next = this.next.bind(this);
    this.gotoScreen = this.gotoScreen.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.mouseWheelHandler = this.mouseWheelHandler.bind(this);
  }

  componentWillMount() {
    // Avoid FOUC by setting content visibility after a delay.
    const start = () => {
      document.getElementById('main').className += ' is-active';
      this.setWheelHandler();
    }
    setTimeout(start.bind(this), 500);

    // Trigger first event on Mixpanel.
    mixpanel.track('User lands on page.');

    // Window resize triggers RESIZE Redux action.
    // Used by VideoScreen to ensure videos are covering the screen.
    window.addEventListener('resize', (e) => {
      this.props.actions.resize({
        width: e.target.innerWidth,
        height: e.target.innerHeight
      });
    });
  }

  mouseWheelHandler(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (canUseWheel) {
      canUseWheel = false;
      if (this.props.viewed.size < this.props.maxSections) {
        this.next();
        this.unsetWheelHandler();
      }
      usingWheelTimer = setTimeout(() => {
        canUseWheel = true;
        this.setWheelHandler();
      }, usingWheelDelay);
    }
  }

  setWheelHandler() {
    // Triggers NEXT_SCREEN Redux action.
    window.addEventListener('mousewheel', this.mouseWheelHandler);
    window.addEventListener('DOMMouseScroll', this.mouseWheelHandler);
    window.addEventListener('touchmove', this.mouseWheelHandler);
  }

  unsetWheelHandler() {
    window.removeEventListener('mousewheel', this.mouseWheelHandler);
    window.removeEventListener('DOMMouseScroll', this.mouseWheelHandler);
    window.removeEventListener('touchmove', this.mouseWheelHandler);
  }

  next() {
    this.props.actions.gotoScreen(this.props.currentSection + 1);
  }

  gotoScreen(id) {
    this.props.actions.gotoScreen(id);
  }

  inputChange(e) {
    this.props.actions.updateEmailValidity(e.target.value);
    this.props.actions.updateInputValue(e.target.value);
  }

  submitForm({email, formAction, formName}) {
    this.props.request.get('isEmailValid') ?
      this.context.store.dispatch(submit({email, formAction, formName})) :
      this.props.actions.warnInvalidEmail(this.props.errors.invalidEmail);
  }

  render() {
    const {
      actions: {nextScreen, submitEmail, resize},
      sections, viewed, isMobile, width,
      height, aspectRatio, inputValue,
      config: {form}, request
    } = this.props;

    return (
      <main id="main">
        <section>
          <ThankYouScreen visible={request.get('requestSuccessful')} texts={sections.ThankYouScreen} />
          <VideoScreen {
            ...screenProps(
              videoScreenProps(sections.VideoScreenEnd, isMobile, width, height, aspectRatio),
              inputValue, request, viewed, form, this.submitForm, this.inputChange
            )
          } />
          <ProvidersScreen {
            ...screenProps(
              providerScreenProps(sections.ProvidersScreen),
              inputValue, request, viewed, form, this.submitForm, this.inputChange
            )
          } />
          <PrivacyScreen {
            ...screenProps(
              sections.PrivacyScreen, inputValue, request, viewed, form, this.submitForm, this.inputChange
            )
          } />
          <VideoScreen {
            ...screenProps(videoScreenProps(sections.VideoScreenStart, isMobile, width, height, aspectRatio),
              inputValue, request, viewed, form, this.submitForm, this.inputChange)
          } nextHandler={this.next} />
        </section>
        <nav>
          <CurrentScreenIndicator
            currentSection={this.props.currentSection}
            sections={sections}
            gotoScreen={this.gotoScreen}
          />
        </nav>
      </main>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);

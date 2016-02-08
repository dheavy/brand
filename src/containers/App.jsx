/**
 * MyPleasure | "brand"
 * --------------------
 * Components container.
 */

import CurrentScreenIndicator from '../components/CurrentScreenIndicator';
import ProvidersScreen from '../components/ProvidersScreen';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PrivacyScreen from '../components/PrivacyScreen';
import VideoScreen from '../components/VideoScreen';
import React, {Component, PropTypes} from 'react';
import * as LandingPageActions from '../actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {debounce} from 'lodash';
import {List} from 'immutable';

function mapStateToProps(state) {
  return {
    currentSection: state.get('currentSection'),
    maxSections: state.get('maxSections'),
    sections: state.get('sections'),
    config: state.get('config'),
    viewed: state.get('viewed'),
    isMobile: state.get('isMobile'),
    inputValue: state.get('inputValue'),
    width: state.get('width'),
    height: state.get('height'),
    aspectRatio: state.get('aspectRatio')
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
function screenProps(props, inputValue, viewed, form, submitForm, inputChange) {
  return Object.assign({}, props, {inputValue, viewed, form, submitForm, inputChange})
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

class App extends Component {

  static propTypes = {
    currentSection: PropTypes.number.isRequired,
    maxSections: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired,
    sections: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    viewed: ImmutablePropTypes.set.isRequired,
    aspectRatio: PropTypes.number.isRequired,
    inputValue: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.gotoScreen = this.gotoScreen.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }

  componentWillMount() {
    // Debounced mousewheel triggers NEXT_SCREEN Redux action.
    // It only works after the first screen is viewed.
    window.addEventListener('mousewheel', (debounce((e) => {
      e.preventDefault();
      if ((e.deltaX < 0 || e.deltaX === -0) &&
          (this.props.viewed.size > 0 && this.props.viewed.size < this.props.maxSections)) {
        this.next();
      }
    }, 1000, {leading: true, trailing: false})).bind(this));

    // Window resize triggers RESIZE Redux action.
    // Used by VideoScreen to ensure videos are covering the screen.
    window.addEventListener('resize', (e) => {
      this.props.actions.resize({
        width: e.target.innerWidth,
        height: e.target.innerHeight
      });
    });
  }

  next() {
    this.props.actions.gotoScreen(this.props.currentSection + 1);
  }

  gotoScreen(id) {
    this.props.actions.gotoScreen(id);
  }

  inputChange(e) {
    this.props.actions.updateInputValue(e.target.value);
  }

  submitForm({email, formAction, formName}) {
    console.log({email, formAction, formName})
    //this.props.actions.submitForm({email, formAction, formName});
  }

  render() {
    const {
      actions: {nextScreen, submitEmail, resize},
      sections,
      viewed,
      isMobile,
      width,
      height,
      aspectRatio,
      inputValue,
      config: {form}
    } = this.props;

    return (
      <main>
        <section>
          <VideoScreen {
            ...screenProps(
              videoScreenProps(sections.VideoScreenEnd, isMobile, width, height, aspectRatio),
              inputValue, viewed, form, this.submitForm, this.inputChange
            )
          } />
          <ProvidersScreen {
            ...screenProps(
              providerScreenProps(sections.ProvidersScreen),
              inputValue, viewed, form, this.submitForm, this.inputChange
            )
          } />
          <PrivacyScreen {
            ...screenProps(
              sections.PrivacyScreen, inputValue, viewed, form, this.submitForm, this.inputChange
            )
          } />
          <VideoScreen {
            ...screenProps(videoScreenProps(sections.VideoScreenStart, isMobile, width, height, aspectRatio),
              inputValue, viewed, form, this.submitForm, this.inputChange)
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
)(App);

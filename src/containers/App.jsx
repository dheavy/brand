/**
 * MyPleasure | "brand"
 * --------------------
 * Components container.
 */

import CurrentScreenIndicator from '../components/CurrentScreenIndicator';
import ProvidersScreen from '../components/ProvidersScreen';
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
    maxSections: state.get('maxSections')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LandingPageActions, dispatch)
  }
}

class App extends Component {
  static propTypes = {
    currentSection: PropTypes.number.isRequired,
    maxSections: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired
  };

  componentWillMount() {
    // Debounce mouse wheel event for performance.
    window.addEventListener('mousewheel', (debounce((e) => {
      e.preventDefault();
      if (e.deltaX < 0 || e.deltaX === -0) {
        this.props.actions.nextScreen(this.props.currentSection);
      }
    }, 1000, {leading: true, trailing: false})).bind(this));
  }

  render() {
    const {actions: {nextScreen, submitEmail}} = this.props;

    return (
      <main>
        <section>
          <VideoScreen
            id={0}
            video="VideoScreen video"
            title="VideoScreen title"
            subtitle="VideoScreen subtitle"
            cta="VideoScreen CTA"
            next="VideoScreen next button label"
          />

          <ProvidersScreen
            id={1}
            title="ProvidersScreen title"
            subtitle="ProvidersScreen subtitle"
            cta="ProvidersScreen CTA"
            providersNormal={List()}
            providersNaughty={List()}
          />

          <PrivacyScreen
            id={2}
            title="PrivacyScreen title"
            subtitle="PrivacyScreen subtitle"
            cta="PrivacyScreen CTA"
          />

          <VideoScreen
            id={3}
            video="VideoScreen video"
            title="VideoScreen title"
            subtitle="VideoScreen subtitle"
            cta="VideoScreen CTA"
          />
        </section>
        <nav>
          <CurrentScreenIndicator />
        </nav>
      </main>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

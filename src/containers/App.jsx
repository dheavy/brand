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
    viewed: state.get('viewed')
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
function screenProps(props, viewed) {
  return Object.assign({}, props, {viewed})
}

// Merge props for 'Provider' screen, to transform arrays
// of providers into immutable Lists.
function providerScreenProps(props) {
  const providersNormal = List.of(props.providersNormal);
  const providersNaughty = List.of(props.providersNaughty);
  return Object.assign({}, props, {providersNormal, providersNaughty});
}

class App extends Component {
  static propTypes = {
    currentSection: PropTypes.number.isRequired,
    maxSections: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired,
    sections: PropTypes.object.isRequired,
    viewed: ImmutablePropTypes.set.isRequired
  };

  // Debounced mousewheel user action
  // triggers NEXT_SCREEN Redux action.
  componentWillMount() {
    window.addEventListener('mousewheel', (debounce((e) => {
      e.preventDefault();
      if (e.deltaX < 0 || e.deltaX === -0) {
        this.props.actions.nextScreen(this.props.currentSection);
      }
    }, 1000, {leading: true, trailing: false})).bind(this));
  }

  render() {
    const {
      actions: {nextScreen, submitEmail},
      sections,
      viewed
    } = this.props;

    return (
      <main>
        <section>
          <VideoScreen {...screenProps(sections.VideoScreenEnd, viewed)} />
          <ProvidersScreen {...screenProps(providerScreenProps(sections.ProvidersScreen), viewed)} />
          <PrivacyScreen {...screenProps(sections.PrivacyScreen, viewed)} />
          <VideoScreen {...screenProps(sections.VideoScreenStart, viewed)} />
        </section>
        <nav>
          <CurrentScreenIndicator currentSection={this.props.currentSection} />
        </nav>
      </main>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

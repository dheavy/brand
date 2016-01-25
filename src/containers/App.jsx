/**
 * MyPleasure | "brand"
 * --------------------
 * Components container.
 */

import CurrentScreenIndicator from '../components/CurrentScreenIndicator';
import ProvidersScreen from '../components/ProvidersScreen';
import PrivacyScreen from '../components/PrivacyScreen';
import VideoScreen from '../components/VideoScreen';
import React, {Component} from 'react';
import {List} from 'immutable';

export default class App extends Component {
  componentWillMount() {
    window.addEventListener('scroll', this.windowScrollHandler.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.windowScrollHandler.bind(this));
  }

  windowScrollHandler(e) {
    console.log(e);
  }

  render() {
    return (
      <main>
        <section>
          <VideoScreen
            video="VideoScreen video"
            title="VideoScreen title"
            subtitle="VideoScreen subtitle"
            cta="VideoScreen CTA"
            next="VideoScreen next button label"
          />

          <ProvidersScreen
            title="ProvidersScreen title"
            subtitle="ProvidersScreen subtitle"
            cta="ProvidersScreen CTA"
            providersNormal={List()}
            providersNaughty={List()}
          />

          <PrivacyScreen
            title="PrivacyScreen title"
            subtitle="PrivacyScreen subtitle"
            cta="PrivacyScreen CTA"
          />

          <VideoScreen
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

import ProvidersScreen from './ProvidersScreen';
import PrivacyScreen from './PrivacyScreen';
import VideoScreen from './VideoScreen';
import React, {Component} from 'react';
import {List} from 'immutable';

export default class App extends Component {
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

/**
 * MyPleasure | "brand"
 * --------------------
 * Stateless, functional component for providers sections.
 */

import ImmutablePropTypes from 'react-immutable-proptypes';
import MotionScreen from './MotionScreen';
import React, {PropTypes} from 'react';
import Logo from './Logo';
import Form from './Form';

const ProvidersScreen = props => {
  return (
    <section className="screen providers" style={props.style}>
      <Logo />
      <div className="row center-full">
        <h1 className="column small-centered small-20 medium-10 large-10 title">{props.title}</h1>
        <h2 className="column small-centered small-20 medium-20 large-20 subtitle">{props.subtitle}</h2>
        <div className="row">
          <Form classNames={"column small-centered small-10 medium-9 large-6"} cta={props.cta} />
        </div>
        <div className="column providers-list small-centered small-20 medium-20 large-20">
          <MediaProviders providers={props.providersNormal} />
        </div>
        <div className="column providers-list small-centered small-20 medium-20 large-20">
          <MediaProviders providers={props.providersNaughty} />
        </div>
      </div>
    </section>
  );
};

ProvidersScreen.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  providersNormal: ImmutablePropTypes.list.isRequired,
  providersNaughty: ImmutablePropTypes.list.isRequired,
  cta: PropTypes.string.isRequired
};

const MediaProviders = props => {
  return (
    <ul>
      {props.providers.map(p => {
        return <MediaProvider provider={p} />
      })}
    </ul>
  );
};

MediaProviders.propTypes = {
  providers: ImmutablePropTypes.list.isRequired
};

const MediaProvider = props => {
  return (
    <li className={props.provider.toLowerCase()}></li>
  );
};

MediaProvider.propTypes = {
  provider: PropTypes.string.isRequired
};

export default MotionScreen(ProvidersScreen);

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

const activateLink = (html, link) => {
  if (html.includes(link.keyword)) {
    html = html.substr(0, html.indexOf(link.keyword) - 1)
      + ` <a href="${link.href}" target="_blank" onclick="javascript:(function(){mixpanel.track('User clicked Twitter link.');ga('send', 'event', 'Twitter link', 'click')}())">${link.keyword}</a>`
      + html.substr(html.indexOf(link.keyword) + link.keyword.length);
  }
  return html;
};

const createMarkup = html => {
  return {__html: html};
};

const ThankYouScreen = props => {
  return (
    <section className={classNames(props.visible)} style={props.style}>
      <Logo />
      <div className="row center-full">
        <h1 className="small-centered small-20 medium-10 large-10 title">{props.texts.title}</h1>
        <h2 className="small-centered small-20 medium-6 large-6 subtitle"
          dangerouslySetInnerHTML={createMarkup(activateLink(props.texts.subtitle, props.texts.link))}
        />
      </div>
    </section>
  );
};

ThankYouScreen.propTypes = {
  visible: PropTypes.bool.isRequired,
  texts: PropTypes.object.isRequired
};

export default ThankYouScreen;

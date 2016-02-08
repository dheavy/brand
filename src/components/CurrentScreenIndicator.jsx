/**
 * MyPleasure | "brand"
 * --------------------
 * Stateless, functional component for the current screen indicator.
 */

import React, {PropTypes} from 'react';
import {Map} from 'immutable';

const CurrentScreenIndicator = props => {
  const sections = Map(props.sections).slice(0, Object.keys(props.sections).length - 1);
  const classNames = isActive => {
    return `${isActive ? ' is-active' : ''}`;
  }

  return (
    <ul>
      {sections && sections.valueSeq().map((s, i) => {
        return <li
                key={i}
                className={classNames(s.id === props.currentSection)}
                onClick={() => props.gotoScreen(i)}
               ></li>;
      })}
    </ul>
  )
};

export default CurrentScreenIndicator;

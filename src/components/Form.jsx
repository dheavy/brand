/**
 * MyPleasure | "brand"
 * --------------------
 * Stateless, functional component for the form.
 */

import React, {PropTypes} from 'react';

const Form = props => {
  return (
    <form className={props.classNames}>
      <div className="input-group">
        <input className="input-group-field" type="email" placeholder="Email" />
        <div className="input-group-button small-20">
          <input type="submit" className="button" value={props.cta} />
        </div>
      </div>
    </form>
  );
}

Form.propTypes = {
  classNames: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired
};

export default Form;

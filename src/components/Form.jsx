/**
 * MyPleasure | "brand"
 * --------------------
 * Stateless, functional component for the form.
 */

/**
 * MyPleasure | "brand"
 * --------------------
 * Stateless, functional form component.
 */

import React, {PropTypes} from 'react';

const Form = props => {
  return (
    <form
      name={props.formName}
      className={props.classNames}
      method={props.formData.method}
      action={props.formData.action}
    >
      <div className="input-group">
        <input className="input-group-field" type="email" placeholder="Email" />
        <div className="input-group-button small-20">
          <input name={props.formData.inputName} type="submit" className="button" value={props.cta} />
        </div>
      </div>
    </form>
  );
}

Form.propTypes = {
  formName: PropTypes.string.isRequired,
  formData: PropTypes.object.isRequired,
  classNames: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired
};

export default Form;

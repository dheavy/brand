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
        <input
          name={props.formData.inputName}
          className="input-group-field"
          type="email"
          placeholder="Email"
          value={props.inputValue}
          onChange={props.inputChange}
        />
        <div className="input-group-button small-20">
          <input
            type="submit"
            className="button"
            value={props.cta}
            disabled={props.inputValue !== '' && props.isEmailValid === false}
            onClick={(e) => {
              e.preventDefault();
              props.submit({
                email: props.inputValue,
                formAction: props.formData.action,
                formName: props.formName
              });
            }}
          />
        </div>
      </div>
      <div className="row error-message">{props.errorMessage}</div>
    </form>
  );
}

Form.propTypes = {
  formName: PropTypes.string.isRequired,
  formData: PropTypes.object.isRequired,
  classNames: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired,
  inputChange: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  isEmailValid: PropTypes.bool.isRequired
};

export default Form;

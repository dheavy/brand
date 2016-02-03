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
          className="input-group-field"
          type="email"
          placeholder="Email"
          defaultValue={props.inputValue}
          onChange={props.inputChange}
        />
        <div className="input-group-button small-20">
          <input
            name={props.formData.inputName}
            type="submit"
            className="button"
            value={props.cta}
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
  inputValue: PropTypes.string
};

export default Form;

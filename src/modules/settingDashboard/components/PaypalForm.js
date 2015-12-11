import React, { PropTypes } from 'react';
import { connectReduxForm } from 'redux-form';
import validate from 'validate.js';

function validateForm(data) {
  const constraints = {
    email: {
      presence: true,
      email: true
    }
  };

  return validate(data, constraints, {fullMessages: false}) || {};
}

@connectReduxForm({
  form: 'editPaypal',
  fields: ['email'],
  validate: validateForm
})
export default class PaypalForm extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  boundHandleSubmit(form) {
    this.props.onSubmit(form);
  }

  render() {
    const { fields: {email}, children, handleSubmit } = this.props;
    const boundHandleSubmit = this.boundHandleSubmit.bind(this);
    return (
      <form onSubmit={handleSubmit(boundHandleSubmit)}>
        <div className="form-group">
          <label>Email</label>
          <input type="text" className="form-control" {...email} />
          {email.error && email.touched && <p>{email.error}</p>}
        </div>
        {children}
      </form>
    );
  }
}

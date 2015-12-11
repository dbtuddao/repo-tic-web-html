import React, { PropTypes } from 'react';
import { connectReduxForm } from 'redux-form';
import validate from 'validate.js';
import Countries from 'helpers/countries';
import Select from 'react-select';

function validateForm(data) {
  const constraints = {
    name: {
      presence: true
    },
    email: {
      presence: true,
      email: true
    },
    country: {
      presence: true,
    }
  };

  return validate(data, constraints, {fullMessages: false}) || {};
}

@connectReduxForm({
  form: 'sellTicketPersonal',
  fields: ['name', 'email', 'country'],
  validate: validateForm
})
export default class PersonalForm extends React.Component {
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
    const { fields: {name, email, country}, children, handleSubmit } = this.props;
    const boundHandleSubmit = this.boundHandleSubmit.bind(this);
    return (
      <form onSubmit={handleSubmit(boundHandleSubmit)}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" {...name} />
          {name.error && name.touched && <p>{name.error}</p>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="text" className="form-control" {...email} />
          {email.error && email.touched && <p>{email.error}</p>}
        </div>
        <div className="form-group">
          <label>Country</label>
          <Select name="country" options={Countries} value={country.value} onChange={country.onChange} />
          {country.error && country.touched && <p>{country.error}</p>}
        </div>
        {children}
      </form>
    );
  }
}

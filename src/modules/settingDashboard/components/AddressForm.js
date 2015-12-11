import React, { PropTypes } from 'react';
import { connectReduxForm } from 'redux-form';
import Countries from 'helpers/countries';
import Select from 'react-select';

@connectReduxForm({
  form: 'editUserAddress',
  fields: ['address1', 'address2', 'city', 'country', 'code'],
})
export default class AddressForm extends React.Component {
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
    const { fields: {address1, address2, city, country, code}, children, handleSubmit } = this.props;
    const boundHandleSubmit = this.boundHandleSubmit.bind(this);
    return (
      <form onSubmit={handleSubmit(boundHandleSubmit)}>
        <div className="form-group">
          <label>Address</label>
          <input type="text" className="form-control" {...address1} />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" {...address2} />
        </div>
        <div className="form-group">
          <label>City</label>
          <input type="text" className="form-control" {...city} />
        </div>
        <div className="form-group">
          <label>Country</label>
          <Select name="country" options={Countries} value={country.value} onChange={country.onChange} />
          {country.error && country.touched && <p>{country.error}</p>}
        </div>
        <div className="form-group">
          <label>Post Code</label>
          <input type="text" className="form-control" {...code} />
        </div>
        {children}
      </form>
    );
  }
}

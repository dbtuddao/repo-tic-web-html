import React, { PropTypes } from 'react';
import mapProps from 'map-props';
import config from 'config';
import Select from 'react-select';

@mapProps({
  getPrice: props => {
    const price = props.fields.price.value ? props.fields.price.value : 0;
    const val = price - (price * config.serviceFee);
    return val.toFixed(2);
  }
})
export default class EditListingFormField extends React.Component {
  static propTypes = {
    advertise: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    getPrice: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object
  }

  boundHandleSubmit(form) {
    console.log('submit', form);
    this.props.onSubmit(form);
  }

  render() {
    const { fields, handleSubmit, getPrice, advertise } = this.props;
    const boundHandleSubmit = this.boundHandleSubmit.bind(this);

    const saleOptions = [
      {value: true, label: 'Sale'},
      {value: false, label: 'Not Sale'},
    ];

    return (
      <form onSubmit={handleSubmit(boundHandleSubmit)}>
        <div className="form-group">
          <label>Selling price</label>
          <input type="text" className="form-control" {...fields.price} />
          {getPrice > 0 && <p>You&#39;ll receive: {getPrice}</p>}
          {fields.price.error && fields.price.touched && <p>{fields.price.error}</p>}
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea className="form-control" row="5" {...fields.description} />
        </div>
        <div className="row">
          <div className="col-xs-12">
            <ul>
              {advertise.tickets.map((item, i)=>{
                if (item.orderID !== '') {
                  return null;
                }

                return (
                  <li key={i}>
                    <img src={`/_api/img/ticket/${item.bundle}/${item.id}_thumb.png`} />
                    <p>{item.codes}</p>
                    <Select options={saleOptions} value={fields[item.id].value ? 'Sale' : 'Not Sale'} onChange={fields[item.id].onChange} clearable={false}/>
                  </li>
                );

              })}
            </ul>
          </div>
        </div>
        <button className="btn" type="submit">Save</button>
      </form>
    );
  }
}

import React, { PropTypes } from 'react';
import { connectReduxForm } from 'redux-form';
import mapProps from 'map-props';
import validate from 'validate.js';
import config from 'config';

const maxPricePercent = config.maxSellPrice * 100;

function validateForm(data) {
  const constraints = {
    price: {
      presence: true,
      format: {
        pattern: /^\d+(\.\d{1,2})?$/,
        message: 'Invald price'
      },
      equality: {
        attribute: 'originalPrice',
        message: `Price should not over ${maxPricePercent}%`,
        comparator: (price, originalPrice) => {
          return price <= originalPrice * config.maxSellPrice;
        }
      }
    },
    originalPrice: {
      presence: true,
      format: {
        pattern: /^\d+(\.\d{1,2})?$/,
        message: 'Invald original price'
      }
    }
  };

  return validate(data, constraints, {fullMessages: false}) || {};
}

@connectReduxForm({
  form: 'sellTicketTicket',
  fields: ['price', 'originalPrice', 'description', 'seat', 'row', 'block', 'section'],
  validate: validateForm
})
@mapProps({
  getPrice: props => {
    const price = props.fields.price.value ? props.fields.price.value : 0;
    const val = price - (price * config.serviceFee);
    return val.toFixed(2);
  }
})
export default class TicketForm extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    getPrice: PropTypes.string,
    onSubmit: PropTypes.func.isRequired
  }

  boundHandleSubmit(form) {
    const data = {
      ...form,
      getPrice: this.props.getPrice
    };

    this.props.onSubmit(data);
  }

  render() {
    const { fields: {price, originalPrice, description, seat, section, row, block}, children, handleSubmit, getPrice } = this.props;
    const boundHandleSubmit = this.boundHandleSubmit.bind(this);
    return (
      <form onSubmit={handleSubmit(boundHandleSubmit)}>
        <div className="form-group">
          <label>Original price</label>
          <input type="text" className="form-control" {...originalPrice} />
          <span>including the service fee</span>
          {originalPrice.error && originalPrice.touched && <p>{originalPrice.error}</p>}
        </div>
        <div className="form-group">
          <label>Selling price</label>
          <input type="text" className="form-control" {...price} />
          {getPrice > 0 && <p>You&#39;ll receive: {getPrice}</p>}
          {price.error && price.touched && <p>{price.error}</p>}
        </div>
        { seat.value &&
          <div className="form-group">
            <label>Section</label>
            <input type="text" className="form-control" {...section} />
            {section.error && section.touched && <p>{section.error}</p>}
          </div>
        }
        { seat.value &&
          <div className="form-group">
            <label>Row</label>
            <input type="text" className="form-control" {...row} />
            {row.error && row.touched && <p>{row.error}</p>}
          </div>
        }
        { seat.value &&
          <div className="form-group">
            <label>Block</label>
            <input type="text" className="form-control" {...block} />
            {block.error && block.touched && <p>{block.error}</p>}
          </div>
        }
        <div className="form-group">
          <label>Description</label>
          <textarea className="form-control" row="5" {...description} />
        </div>
        {children}
      </form>
    );
  }
}

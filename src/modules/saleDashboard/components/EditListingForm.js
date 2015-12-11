import React, { PropTypes } from 'react';
import { connectReduxForm } from 'redux-form';
import EditListingFormField from './EditListingFormField';
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
      presence: false
    }
  };

  if (data.seat) {
    constraints.row = {
      presence: true
    };

    constraints.block = {
      presence: true
    };
  }

  return validate(data, constraints, {fullMessages: false}) || {};
}

export default class EditListingForm extends React.Component {
  static propTypes = {
    advertise: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  render() {
    const { advertise, onSubmit } = this.props;
    const fields = ['price', 'description', 'originalPrice'];

    advertise.tickets.forEach((ticket) => {
      if (ticket.orderID === '') {
        fields.push(ticket.id);
      }
    });

    const Form = connectReduxForm({ form: 'editListing', fields: fields, validate: validateForm })(EditListingFormField);

    return <Form advertise={advertise} onSubmit={onSubmit} />;
  }
}

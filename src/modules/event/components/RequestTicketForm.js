import React, { PropTypes } from 'react';
import validator from 'validate.js';
import { connectReduxForm } from 'redux-form';

// Components
import { FacebookButton } from 'components';
import Select from 'react-select';

function validate(data) {
  const constraints = {
    qty: {
      presence: true
    },
    maximumPrice: {
      presence: true,
      format: {
        pattern: /^\d+(\.\d{1,2})?$/,
        message: 'Invald price'
      }
    },
    ticketTypeID: {
      presence: true
    }
  };

  return validator(data, constraints, {fullMessages: false}) || {};
}

@connectReduxForm({
  form: 'wantTicket',
  fields: ['qty', 'ticketTypeID', 'maximumPrice', 'comment', 'fbwall'],
  validate: validate
})
export default class RequestTicketForm extends React.Component {
  static propTypes = {
    session: PropTypes.object.isRequired,
    ticketTypes: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    initializeForm: PropTypes.func.isRequired
  }

  componentWillUnmount() {
    this.props.initializeForm({});
  }

  handleSave(data) {
    if (this.props.onSubmit) {
      this.props.onSubmit(data);
    }
  }

  render() {
    const { ticketTypes, session, handleSubmit, fields: { qty, ticketTypeID, maximumPrice, comment, fbwall } } = this.props;

    let submitButton = <FacebookButton text="Login with Facebook" />;
    if (session) {
      submitButton = (<input className="btn btn-primary" type="submit" value="Add wanted listing"/>);
    }

    const qtyOptions = [];
    for (let i = 1; i <= 10; i++) {
      qtyOptions.push({value: i + '', label: i + ''});
    }

    const ticketTypeOptions = [];
    for (let i = 0; i < ticketTypes.length; i++) {
      ticketTypeOptions.push({value: ticketTypes[i].id, label: ticketTypes[i].name});
    }

    return (
      <form onSubmit={handleSubmit(this.handleSave.bind(this))}>
        <div className="form-group">
          <label>Enter number of tickets are you looking for</label>
          <Select options={qtyOptions} value={qty.value} onChange={qty.onChange} />
          {qty.error && qty.touched && <p>{qty.error}</p>}
        </div>
        <div className="form-group">
          <label>Ticket Type</label>
          <Select options={ticketTypeOptions} value={ticketTypeID.value} onChange={ticketTypeID.onChange} />
          {ticketTypeID.error && ticketTypeID.touched && <p>{ticketTypeID.error}</p>}
        </div>
        <div className="form-group">
          <label>Maximum Price</label>
          <input type="text" className="form-control" {...maximumPrice} />
          {maximumPrice.error && maximumPrice.touched && <p>{maximumPrice.error}</p>}
        </div>
        <div className="form-group">
          <label>Any Comment</label>
          <textarea className="form-control" row="5" {...comment} />
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" {...fbwall} /> Post to my Facebook wall
          </label>
        </div>
        {submitButton}
      </form>
    );
  }
}

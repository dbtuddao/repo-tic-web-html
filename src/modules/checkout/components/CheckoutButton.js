import React, { PropTypes } from 'react';
import config from 'config';
import StripeCheckout from 'react-stripe-checkout';

export default class CheckoutButton extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    amount: PropTypes.number.isRequired,
    description: PropTypes.string,
    currency: PropTypes.string.isRequired
  }

  static defaultProps = {
    currency: 'AUD'
  }

  handleToken(token) {
    const { amount, currency } = this.props;
    this.props.onClick(token.id, amount, currency);
  }

  render() {
    const handleToken = this.handleToken.bind(this);
    const { description, amount, currency } = this.props;

    // TODO: Validate that amount actually has 2 decimal places.
    return (
      <StripeCheckout
        name="TIX"
        description={description}
        panelLabel="PAY"
        amount={Math.round(amount * 100)}
        currency={currency}
        stripeKey={config.stripeKey}
        token={handleToken}>

        <button className="btn btn-success">
          Pay with Credit Card
        </button>

      </StripeCheckout>
    );
  }
}

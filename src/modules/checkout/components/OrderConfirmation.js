import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

@connect(state => ({
  previousCart: state.cart.previousCart
}))
export default class OrderConfirmation extends React.Component {
  static propTypes = {
    session: PropTypes.object.isRequired,
    previousCart: PropTypes.object.isRequired
  }

  render() {
    console.log('OrderConfirmation render: %o', this.props);

    const cart = this.props.previousCart;
    const count = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    const total = cart.amount;

    return (
      <div className="OrderConfirmationPage row">
        <div className="col-md-12">
          <h1>Order Placed !</h1>
          <p>
            You have successfully made a purchase of {count} ticket(s) worth ${total}!
          </p>

          <Link className="btn btn-success btn-lg" to={'/'}>
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    );
  }
}

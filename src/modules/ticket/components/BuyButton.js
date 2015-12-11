import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FacebookButton } from 'components';
import * as CartActions from 'redux/modules/cart';
import * as SessionActions from 'redux/modules/session';

@connect(
  state => ({
    session: state.session
  })
)
export default class BuyButton extends React.Component {
  static propTypes = {
    qty: PropTypes.number.isRequired,
    session: PropTypes.object.isRequired,
    advertise: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.object
  }

  handleBuyClick() {
    const { dispatch, advertise, qty } = this.props;

    dispatch(SessionActions.save('cart', {
      id: advertise.data.id,
      qty
    })).then(() => {
      dispatch(CartActions.updateCart(advertise.data.id, qty));
      this.context.router.transitionTo(`/checkout`);
    });
  }

  render() {
    const { session, advertise } = this.props;
    const handleBuyClick = this.handleBuyClick.bind(this);

    if (!session.data) {
      return (
        <div className="alert alert-warning">
          <p>Please <FacebookButton /> to purchase this ticket.</p>
        </div>
      );
    }

    if (session.data.auth.userID === advertise.data.userID) {
      return null;
    }

    if (advertise && advertise.data.qty === 0) {
      return (
        <button className="btn btn-default btn-lg" disabled="disabled">
          SOLD OUT !
        </button>
      );
    }

    return (
      <button className="btn btn-success btn-lg" onClick={handleBuyClick}>BUY NOW !</button>
    );
  }
}

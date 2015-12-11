import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { CartSummary, TicketDetail, CheckoutButton } from '../components';
import { ErrorMessage, SmallHeader, Footer } from 'components';
import * as CartActions from 'redux/modules/cart';
import * as OrderActions from 'redux/modules/order';
import * as AdvertiseActions from 'redux/modules/advertise';
import buyCal from 'helpers/buyCal';

@connect(state => ({
  cart: state.cart,
  session: state.session,
  order: state.order,
  advertise: state.advertise
}))
export default class Checkout extends React.Component {
  static propTypes = {
    cart: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    advertise: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    this.props.dispatch(OrderActions.init());
  }

  static onEnter(store) {
    return (nextState, transition) => {
      const { cart, advertise } = store.getState();
      if (!cart.data || !advertise.data) {
        transition.to( '/');
      }
    };
  }

  static fetchData(store) {
    const { cart, session } = store.getState();
    if (!cart.data) {
      if (!session.data) {
        return Promise.reject();
      }

      if (!session.data.cart) {
        return Promise.reject();
      }

      const promises = [];
      promises.push(store.dispatch(CartActions.updateCart(session.data.cart.id, session.data.cart.qty)));
      promises.push(store.dispatch(AdvertiseActions.get(session.data.cart.id)));
      return Promise.all(promises);
    }

    return store.dispatch(AdvertiseActions.get(session.data.cart.id));
  }

  handlerOrderClick(token, amount, currency) {
    const { session, cart, dispatch } = this.props;
    dispatch(OrderActions.order(
      session.data.auth.token,
      cart.data.id,
      amount.toFixed(2),
      cart.data.qty,
      currency, token
    )).then(()=>{
      const { order } = this.props;
      if (!order.error) {
        this.context.router.transitionTo(`/dashboard/purchase`);
      }
    });
  }

  render() {
    const { cart, order, advertise } = this.props;
    const handlerOrderClick = this.handlerOrderClick.bind(this);
    const cost = buyCal(advertise.data.sellPrice, cart.data.qty);

    return (
      <div>
        <SmallHeader/>
        <div className="container-fluid">
          <div className="container">
            <div className="CheckoutPage row">
              <div className="col-md-12">
                <ErrorMessage error={order.error} />
                <TicketDetail advertise={advertise.data} />
                <CartSummary
                  subtotal={cost.totalPrice}
                  vatPercent={cost.vatPercent}
                  vat={cost.vat}
                  grandTotal={cost.grandTotal}
                  sellPrice={advertise.data.sellPrice}
                  serviceFee={cost.serviceFee}
                  qty={cart.data.qty}
                />
              </div>
              <CheckoutButton
                onClick={handlerOrderClick}
                amount={parseFloat(cost.grandTotal)}
              />
              <p>By clicking on the 'Pay' button you agree to our <a href="/agreement/buyer" target="_blank">User Agreement</a>.</p>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

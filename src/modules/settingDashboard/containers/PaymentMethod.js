import React from 'react';
import { Paypal } from '../components';
import { reFetch } from 'redux/modules/app';
import * as PaymentMethodActions from 'redux/modules/paymentMethod';
import { initialize } from 'redux-form';

export default class PaymentMethod extends React.Component {

  static fetchData(store) {
    const { session } = store.getState();
    if (reFetch(store) && session.data && session.data.auth) {
      return store.dispatch(PaymentMethodActions.getPaypal(session.data.auth.token)).then(() => {
        const { paymentMethodPaypal } = store.getState();
        if (paymentMethodPaypal.data) {
          return store.dispatch(initialize('editPaypal', {
            email: paymentMethodPaypal.data.email
          }));
        }
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Payment Method</h1>
        <div className="row">
          <div className="col-xs-12">
            <Paypal />
          </div>
        </div>
      </div>
    );
  }
}

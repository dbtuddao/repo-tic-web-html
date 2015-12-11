import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reFetch } from 'redux/modules/app';
import { BuyButton } from '../components';
import { SmallHeader, Footer } from 'components';
import * as AdvertiseActions from 'redux/modules/advertise';
import errorRedirect from 'helpers/errorRedirect';

@connect(state => ({
  advertise: state.advertise
}))
export default class Ticket extends React.Component {
  static propTypes = {
    advertise: PropTypes.object.isRequired
  }

  state = {
    qty: 1
  }

  static onEnter(store) {
    return (nextState, transition) => {
      const { advertise } = store.getState();

      if (advertise.error) {
        errorRedirect(advertise.error.status, transition);
      }
    };
  }

  static fetchData(store, state) {
    if (reFetch(store)) {
      return store.dispatch(AdvertiseActions.get(state.params.id));
    }
  }

  listQtyOption(qty) {
    const options = [];
    for (let i = 0; i < qty; i++) {
      options.push((<option key={i} value={i + 1}>{i + 1}</option>));
    }

    return options;
  }

  changeQty(e) {
    this.setState({qty: e.target.value});
  }

  render() {
    const advertise = this.props.advertise;
    const { qty } = this.state;

    return (
      <div>
        <SmallHeader/>
        <div className="container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <h3>Ticket: {advertise.data.description}</h3>
                <p>Owner: {advertise.data.user && advertise.data.user.name}</p>
                <p>Email: {advertise.data.user && advertise.data.user.email}</p>
                <p>Price: {advertise.data.sellPrice}</p>
                <p>Description: {advertise.data.description}</p>
                <p>Status: {advertise.data.status}</p>
                <p>Qty: {advertise.data.qty}</p>
                <select value={qty} onChange={::this.changeQty}>{::this.listQtyOption(advertise.data.qty)}</select>
              </div>
              <BuyButton advertise={advertise} qty={parseInt(qty, 10)} />
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

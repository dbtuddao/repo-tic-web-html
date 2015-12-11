import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { initialize } from 'redux-form';
import { PromotionForm } from '../components';
import * as SellTicketActions from 'redux/modules/sellTicket';
import * as SessionActions from 'redux/modules/session';
import * as FacebookActions from 'redux/modules/facebook';

@connect(
  state => ({
    sellTicket: state.sellTicket,
    fbEventName: state.fbEventName
  })
)
export default class Promotion extends React.Component {
  static propTypes = {
    fbEventName: PropTypes.object.isRequired,
    sellTicket: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  }

  static fetchData(store) {
    const { sellTicket } = store.getState();
    const promises = [];
    if (sellTicket.data.promotion) {
      promises.push(store.dispatch(initialize('sellTicketPromotion', {
        ...sellTicket.data.promotion
      })));
    }

    if (sellTicket.data.event.fbEventID) {
      promises.push(store.dispatch(FacebookActions.getEventName(sellTicket.data.event.fbEventID)));
    }

    return Promise.all(promises);
  }

  handleSubmit(data) {
    const { dispatch } = this.props;
    const { router } = this.context;
    dispatch(SellTicketActions.savePromotion(data));
    const { sellTicket } = this.context.store.getState();
    return dispatch(SessionActions.save('sellTicket', sellTicket.data)).then(() => {
      router.transitionTo(`/sell/ticket/confirm`);
    });
  }

  render() {
    const { fbEventName } = this.props;
    const handleSubmit = this.handleSubmit.bind(this);

    return (
      <div className="row">
        <div className="col-xs-12">
          <h2>Promotion</h2>
        </div>
        <div className="col-xs-12">
          <PromotionForm onSubmit={handleSubmit} fbEventName={fbEventName.data ? fbEventName.data.name : ''}>
            <Link to="/sell/ticket/personal" className="btn btn-default">Back</Link>
            <button type="submit" className="btn btn-default">Next</button>
          </PromotionForm>
        </div>
      </div>
    );
  }
}

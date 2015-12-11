import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { initialize } from 'redux-form';
import { TicketForm } from '../components';
import * as SellTicketActions from 'redux/modules/sellTicket';
import * as SessionActions from 'redux/modules/session';

@connect(
  state => ({
    sellTicket: state.sellTicket
  })
)
export default class Ticket extends React.Component {
  static propTypes = {
    sellTicket: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  }

  static fetchData(store) {
    const { sellTicket } = store.getState();
    if (sellTicket.data.ticket) {
      return store.dispatch(initialize('sellTicketTicket', {
        ...sellTicket.data.ticket,
        seat: sellTicket.data.ticketType.seat
      }));
    }

    return store.dispatch(initialize('sellTicketTicket', {
      seat: sellTicket.data.ticketType.seat
    }));
  }

  handleSubmit(data) {
    const { dispatch } = this.props;
    const { router } = this.context;
    dispatch(SellTicketActions.saveTicket(data));
    const { sellTicket } = this.context.store.getState();
    return dispatch(SessionActions.save('sellTicket', sellTicket.data)).then(() => {
      router.transitionTo(`/sell/ticket/personal`);
    });
  }

  render() {
    const handleSubmit = this.handleSubmit.bind(this);

    return (
      <div className="row">
        <div className="col-xs-12">
          <h2>Ticket Detail</h2>
        </div>
        <div className="col-xs-12">
          <TicketForm onSubmit={handleSubmit}>
            <Link to="/sell/ticket/upload" className="btn btn-default">Back</Link>
            <button type="submit" className="btn btn-default">Next</button>
          </TicketForm>
        </div>
      </div>
    );
  }
}

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as SellTicketActions from 'redux/modules/sellTicket';
import * as SessionActions from 'redux/modules/session';
import { ErrorMessage } from 'components';
import moment from 'moment';
import saleCal from 'helpers/saleCal';

@connect(
  state => ({
    sellTicket: state.sellTicket,
    session: state.session
  })
)
export default class Confirm extends React.Component {
  static propTypes = {
    sellTicket: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  }

  handleSubmit() {
    const { dispatch, sellTicket, session } = this.props;
    const { router } = this.context;
    dispatch(SellTicketActions.saveSellTicket(sellTicket, session.data.auth.userID)).then((res) => {
      if (!res.error) {
        return dispatch(SessionActions.save('sellTicket', null)).then(() => {
          router.transitionTo(`/dashboard/sell/listing`);
        });
      }
    });
  }

  render() {
    const { sellTicket } = this.props;
    const handleSubmit = this.handleSubmit.bind(this);

    let numTicket = 0;
    for (const i in sellTicket.data.upload) {
      if (sellTicket.data.upload.hasOwnProperty(i)) {
        for (let j = 0; j < sellTicket.data.upload[i].uploads.length; j++) {
          if (sellTicket.data.upload[i].uploads[j].sale) {
            numTicket++;
          }
        }
      }
    }

    const cost = saleCal(sellTicket.data.ticket.price, numTicket);

    return (
      <div className="row">
        <div className="col-xs-12">
          <h2>Confirmation</h2>
        </div>
        <div className="col-xs-12">
          <ErrorMessage error={sellTicket.saveError}/>
        </div>
        <div className="col-xs-12">
          <div>
            <h3>Event Information</h3>
            <p>Event: {sellTicket.data.event.name}, {sellTicket.data.event.venue.name}, {sellTicket.data.event.venue.city.name}</p>
            <p>Ticket Type: {sellTicket.data.ticketType.name}</p>
            <p>Date: {moment(sellTicket.data.event.fromDate).format('lll')}</p>
            <br/>
          </div>
          <div>
            <h3>Ticket Information</h3>
            <p>Ticket Price: {sellTicket.data.ticket.price}</p>
            <p>Number of Ticket: {numTicket}</p>
            <p>Total: {cost.totalPrice}</p>
            <p>Service Fee: -{cost.serviceFee}</p>
            <p>You will get: {cost.grandTotal}</p>
            <br/>
          </div>
          <div>
            <h3>Personal Information</h3>
            <p>Name: {sellTicket.data.personal.name}</p>
            <p>Email: {sellTicket.data.personal.email}</p>
            <p>Country: {sellTicket.data.personal.country}</p>
            <br/>
          </div>
          <div>
            <h3>Promotion</h3>
            <p>{sellTicket.data.promotion.fbevent && `Post to facebook event`}</p>
            <p>{sellTicket.data.promotion.fbwall && `Post to facebook wall`}</p>
            <p>{sellTicket.data.promotion.email && `Sale on {sellTicket.data.promotion.emails}`}</p>
            <br/>
          </div>
        </div>
        <div className="col-xs-12">
          <br/>
          <p>Please confirm your sell ticket</p>
          <button onClick={handleSubmit} className="btn btn-default">Confirm</button>
          <p>By clicking on the 'Confirm' button you agree to our <a href="/agreement/seller" target="_blank">User Agreement</a>.</p>
        </div>
      </div>
    );
  }
}

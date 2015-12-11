import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { SearchForm, MostSoldEvent } from '../components';
import * as SellTicketActions from 'redux/modules/sellTicket';
import * as TicketTypeActions from 'redux/modules/ticketType';
import * as EventActions from 'redux/modules/event';
import * as SessionActions from 'redux/modules/session';

@connect(
  state => ({
    sellTicket: state.sellTicket,
    mostSoldEventList: state.eventListMostSold,
    ticketTypeList: state.ticketTypeListAllByEvent
  })
)
export default class SelectEvent extends React.Component {
  static propTypes = {
    sellTicket: PropTypes.object.isRequired,
    mostSoldEventList: PropTypes.object.isRequired,
    ticketTypeList: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  }

  static fetchData(store) {
    const { sellTicket } = store.getState();
    const promises = [];
    promises.push(store.dispatch(EventActions.listMostSold(10, 0)));
    if (sellTicket.data.event) {
      promises.push(store.dispatch(TicketTypeActions.listAllByEvent(sellTicket.data.event.id)));
    }

    return Promise.all(promises);
  }

  listTicketType(item, i) {
    const saveTicketType = this.saveTicketType.bind(this, item);
    return (<li key={i} className="pointer" onClick={saveTicketType}>{item.name}</li>);
  }

  saveEvent(eventID) {
    const { dispatch } = this.props;
    const { store } = this.context;
    dispatch(EventActions.get(eventID)).then(() => {
      const { event } = store.getState();
      return dispatch(TicketTypeActions.listAllByEvent(event.data.id)).then(() => {
        dispatch(SellTicketActions.saveEvent(event.data));
      });
    });
  }

  saveTicketType(ticketType) {
    const { dispatch } = this.props;
    dispatch(SellTicketActions.saveTicketType(ticketType));
  }

  changeEvent() {
    const { dispatch } = this.props;
    dispatch(SellTicketActions.changeEvent());
  }

  changeTicketType() {
    const { dispatch } = this.props;
    dispatch(SellTicketActions.changeTicketType());
  }

  handleNextStep() {
    const { dispatch } = this.props;
    const { router } = this.context;
    const { sellTicket } = this.props;
    return dispatch(SessionActions.save('sellTicket', sellTicket.data)).then(() => {
      router.transitionTo(`/sell/ticket/upload`);
    });
  }

  render() {
    const { sellTicket, mostSoldEventList, ticketTypeList } = this.props;
    const saveEvent = this.saveEvent.bind(this);
    const listTicketType = this.listTicketType.bind(this);
    const changeEvent = this.changeEvent.bind(this);
    const changeTicketType = this.changeTicketType.bind(this);
    const handleNextStep = this.handleNextStep.bind(this);

    if (!sellTicket.data.event) {
      return (
        <div className="row">
          <div className="col-xs-12">
            <SearchForm onSelect={saveEvent} />
            <MostSoldEvent events={mostSoldEventList.data.events} onSelect={saveEvent} />
          </div>
        </div>
      );
    }

    if (sellTicket.data.event && !sellTicket.data.ticketType) {
      return (
        <div className="row">
          <div className="col-xs-12">
            <h3>{sellTicket.data.event.name}, {sellTicket.data.event.venue.name}</h3>
            <p><a href="javascript:;" onClick={changeEvent}> Change Event</a></p>
          </div>
          <div className="col-xs-12">
            <h3>Select Ticket Type</h3>
            <ul>
              {ticketTypeList && ticketTypeList.data.ticketTypes.map(listTicketType)}
            </ul>
          </div>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col-xs-12">
          <h3>{sellTicket.data.event.name}, {sellTicket.data.event.venue.name}</h3>
          <p><a href="javascript:;" onClick={changeEvent}> Change Event</a></p>
        </div>
        <div className="col-xs-12">
          <h3>{sellTicket.data.ticketType.name}</h3>
          <p><a href="javascript:;" onClick={changeTicketType}> Change Ticket Type</a></p>
        </div>
        <div className="col-xs-12">
          <button onClick={handleNextStep} className="btn btn-default">Next</button>
        </div>
      </div>
    );
  }
}

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { reFetch } from 'redux/modules/app';
import moment from 'moment';
import errorRedirect from 'helpers/errorRedirect';

// Components
import {
  Header,
  Footer,
  AsSeenOn,
  ShortFeature,
  PeopleSay
} from 'components';

import {
  AvailableAdvertise,
  SoldAdvertiseList,
  WishListList,
  EventHeader
} from '../components';

// Actions
import * as EventActions from 'redux/modules/event';
import * as AdvertiseActions from 'redux/modules/advertise';
import * as WishListActions from 'redux/modules/wishList';
import * as SellTicketActions from 'redux/modules/sellTicket';
import * as TicketTypeActions from 'redux/modules/ticketType';

@connect(
  state => ({
    event: state.event,
    advertiseListAvailable: state.advertiseListAvailableByEvent,
    advertiseListSold: state.advertiseListSoldByEvent,
    wishListListAll: state.wishListListAllByEvent,
    ticketTypeList: state.ticketTypeListAllByEvent
  })
)
export default class Event extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    advertiseListAvailable: PropTypes.object.isRequired,
    advertiseListSold: PropTypes.object.isRequired,
    wishListListAll: PropTypes.object.isRequired,
    ticketTypeList: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentDidMount() {
    jQuery(document).ready(() => {
      jQuery('.choose-block ul li h6').click(() => {
        jQuery(this).parent().find('ul').slideToggle();
        jQuery(this).parent().siblings().find('ul').slideUp();
      });
    });
  }

  static onEnter(store) {
    return (nextState, transition) => {
      const { event } = store.getState();

      if (event.error) {
        errorRedirect(event.error.status, transition);
      }
    };
  }

  static fetchData(store, state) {
    if (reFetch(store)) {
      return store.dispatch(EventActions.getBySlug(state.params.id, true)).then(() => {
        const { event } = store.getState();
        const promises = [];
        promises.push(store.dispatch(TicketTypeActions.listAllByEvent(event.data.id)));
        promises.push(store.dispatch(AdvertiseActions.listAvailableByEvent(event.data.id, 10, 0)));
        promises.push(store.dispatch(AdvertiseActions.listSoldByEvent(event.data.id, 10, 0)));
        promises.push(store.dispatch(WishListActions.listAllByEvent(event.data.id, 10, 0)));
        return Promise.all(promises);
      });
    }
  }

  goToSellTicket(e) {
    e.preventDefault();
    this.props.dispatch(SellTicketActions.fromEvent(this.props.event.data));
    this.context.router.transitionTo(`/sell/ticket`);
  }

  handleSelectAll(eventID, limit, offset) {
    this.props.dispatch(AdvertiseActions.listAvailableByEvent(eventID, limit, offset));
  }

  handleSelectTicketType(eventID, ticketTypeID, limit, offset) {
    this.props.dispatch(AdvertiseActions.listAvailableByTicketType(ticketTypeID, limit, offset));
  }

  render() {
    const { event, advertiseListAvailable, advertiseListSold, wishListListAll, ticketTypeList } = this.props;
    const handleSelectAll = this.handleSelectAll.bind(this);
    const handleSelectTicketType = this.handleSelectTicketType.bind(this);

    return (
      <div>
        <Header>
           <EventHeader event={event.data} />
        </Header>
        <div className="main-content col-xs-12">
          <div className="container">
            <div className="row">
              <div className="even-page">
                <div className="sub-nav">
                  <ul>
                    <li className="no_bg"><Link to="/">Home </Link></li>
                    <li><Link to="/">{event.data.name} </Link></li>
                  </ul>
                  <div className="clear"></div>
                </div>
                <div className="mysteryland">
                  <div className="mysteryland-address col-sm-6">
                    <h4>{event.data.name}</h4>
                    <ul>
                      <li><img src="/images/calender-icon.png" width="28" height="28" alt="calender"/><span>{moment(event.data.fromDate).format('DD MMMM YYYY')}</span><strong className="clear"></strong></li>
                      <li><img src="/images/clock-icon2.png" width="28" height="28" alt="clock"/><span>{moment(event.data.fromDate).format('HH:mm A')}</span><strong className="clear"></strong></li>
                      <li><img src="/images/locater-icon.png" width="28" height="28" alt="locater"/><span>{event.data.venue.name},&nbsp;{event.data.venue.city.name}</span><strong className="clear"></strong></li>
                      <li><img src="/images/venue-icon.png" width="28" height="28" alt="venue"/><a href="#">Show Venue Map</a><strong className="clear"></strong></li>
                    </ul>
                  </div>
                  <div className="ticket-information">
                    <ul>
                      <li><a><span><span style={{textAlign: 'center', display: 'block'}}>{event.data.available}</span><small>Available</small></span></a></li>
                      <li><a><span><span style={{textAlign: 'center', display: 'block'}}>{event.data.sold}</span><small>Sold</small></span></a></li>
                      <li><a><span><span style={{textAlign: 'center', display: 'block'}}>{event.data.wanted}</span><small>Wanted</small></span></a></li>
                    </ul>
                    <div className="clear"></div>
                  </div>
                  <div className="clear"></div>
                  <div className="ticket-booking col-md-10 col-xs-12">
                    <ul>
                      <li className="col-sm-6 col-xs-12"><a href="javascript:;" onClick={::this.goToSellTicket} className="active">I want to sell Ticket</a></li>
                      <li className="col-sm-6 col-xs-12"><Link to={`/event/${event.data.slug}/want`}>I looking for a ticket</Link></li>
                    </ul>
                    <div className="clear"></div>
                  </div>
                  <div className="clear"></div>
                </div>
                <AvailableAdvertise
                  event={event.data}
                  ticketTypes={ticketTypeList.data.ticketTypes}
                  advertises={advertiseListAvailable.data.advertises}
                  onSelectAll={handleSelectAll}
                  onSelectTicketType={handleSelectTicketType}
                />
                <SoldAdvertiseList event={event.data} advertises={advertiseListSold.data.advertises} />
                <WishListList wishLists={wishListListAll.data.wishLists} total={wishListListAll.data.total} />
              </div>
            </div>
          </div>
        </div>
        <PeopleSay />
        <ShortFeature />
        <div className="clear"></div>
        <AsSeenOn />
        <div className="clear"></div>
        <Footer />
      </div>
    );
  }
}

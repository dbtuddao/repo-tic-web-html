import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reFetch } from 'redux/modules/app';
import { Link } from 'react-router';

// Components
import { RangeDateEvent, EventFeature, TicketTypeList } from '../components';
import {
  SearchForm,
  Header,
  Footer,
  AsSeenOn,
  ShortFeature,
  PeopleSay
} from 'components';

// Actions
import * as EventActions from 'redux/modules/event';
import * as SearchActions from 'redux/modules/search';

@connect(
  state => ({
    eventListFeature: state.eventListFeature,
    eventListRangeDate: state.eventListRangeDate
  })
)
export default class Home extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    eventListRangeDate: PropTypes.object.isRequired,
    eventListFeature: PropTypes.object.isRequired
  }

  static fetchData(store) {
    const promises = [];
    if (reFetch(store)) {
      promises.push(store.dispatch(EventActions.listToday(8, 0)));
      promises.push(store.dispatch(EventActions.listFeature(10, 0)));
    }

    return Promise.all(promises);
  }

  handleSearch(q) {
    this.props.dispatch(SearchActions.search(q));
  }

  handleRangeDateChange(eventType) {
    switch (eventType) {
      case 'today':
        this.props.dispatch(EventActions.listToday(8, 0));
        break;
      case 'tomorrow':
        this.props.dispatch(EventActions.listTomorrow(8, 0));
        break;
      case 'thisweekend':
        this.props.dispatch(EventActions.listThisWeekend(8, 0));
        break;
      case 'thisweek':
        this.props.dispatch(EventActions.listThisWeek(8, 0));
        break;
    }
  }

  render() {
    const { eventListRangeDate, eventListFeature } = this.props;
    const handleSearch = this.handleSearch.bind(this);
    const handleRangeDateChange = this.handleRangeDateChange.bind(this);
    return (
      <div>
        <Header fullPage>
          <div className="container">
            <div className="row">
              <div className="banner">
                <h1>Lorem ipsum lorem ipsum</h1>
                <p>Lorem ipsum lorem ipsum</p>
                <SearchForm id="home-search" onSearch={handleSearch} />
                <TicketTypeList />
              </div>
            </div>
          </div>
        </Header>
        <div className="main-content">
          {eventListFeature.data &&
            <EventFeature
              events={eventListFeature.data.events}
              total={eventListFeature.data.total}
            />
          }

          {eventListRangeDate.data &&
            <RangeDateEvent
              onRangeDateChange={handleRangeDateChange}
              eventType={eventListRangeDate.eventType}
              events={eventListRangeDate.data.events}
              total={eventListRangeDate.data.total}
            />
          }
        </div>
        <div className="tickets-block container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <h2 className="block-title ">Categories</h2>
                <ul>
                  <li className="col-md-7 col-sm-7 col-xs-12">
                    <div className="con">
                      <Link to={`/category/concert-tickets/events`}>
                        <img src="/images/tickets-imag1.jpg" width="500" height="240" alt="tiket"/>
                        <span>CONCERT TICKETS</span>
                      </Link>
                    </div>
                  </li>
                  <li className="sport col-md-5 col-sm-5 col-xs-12">
                    <div className="con">
                      <Link to={`/category/sports-tickets/events`}>Sports Tickets
                        <img src="/images/tickets-imag2.jpg" width="317" height="240" alt="tiket"/>
                        <span>SPORT TICKETS</span>
                      </Link>
                    </div>
                  </li>
                  <li className="col-md-4 col-sm-4 col-xs-12">
                    <div className="con">
                      <Link to={`/category/theater-tickets/events`}>Theater Tickets
                        <img src="/images/tickets-imag3.jpg" width="266" height="185" alt="tiket"/>
                        <span>Theater Tickets</span>
                      </Link>
                    </div>
                  </li>
                  <li className="col-md-4 col-sm-4 col-xs-12">
                    <div className="con">
                      <Link to={`/category/festival-tickets/events`}>Festival Tickets
                        <img src="/images/tickets-imag4.jpg" width="265" height="185" alt="tiket"/>
                        <span>Festival Tickets</span>
                      </Link>
                    </div>
                  </li>
                  <li className="col-md-4 col-sm-4 col-xs-12">
                    <div className="con">
                      <Link to={`/category/other/events`}>
                        <img src="/images/tickets-imag5.jpg" width="265" height="185" alt="tiket"/>
                        <span>Other Tickets</span>
                      </Link>
                    </div>
                  </li>
                </ul>
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

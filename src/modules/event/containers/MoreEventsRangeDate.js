import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reFetch } from 'redux/modules/app';
import { RangeDateEventList } from '../components';
import * as EventActions from 'redux/modules/event';
import { SmallHeader, Footer, AsSeenOn } from 'components';
import { Link } from 'react-router';

@connect(
  state => ({
    eventListRangeDate: state.eventListRangeDate
  })
)
export default class MoreEventsRangeDate extends React.Component {
  static propTypes = {
    eventListRangeDate: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  getTitle(pathname) {
    switch (pathname) {
      case '/event/today':
        return 'Today';
      case '/event/tomorrow':
        return 'Tomorrow';
      case '/event/thisweekend':
        return 'This Weekend';
      case '/event/thisweek':
        return 'This Week';
    }
  }

  static fetchData(store, state) {
    if (reFetch(store)) {
      switch (state.location.pathname) {
        case '/event/today':
          return store.dispatch(EventActions.listToday(20, 0));
        case '/event/tomorrow':
          return store.dispatch(EventActions.listTomorrow(20, 0));
        case '/event/thisweekend':
          return store.dispatch(EventActions.listThisWeekend(20, 0));
        case '/event/thisweek':
          return store.dispatch(EventActions.listThisWeek(20, 0));
      }
    }
  }

  render() {
    const { eventListRangeDate, location } = this.props;
    const title = this.getTitle(location.pathname);
    return (
      <div>
        <SmallHeader/>
        <div className="page-sellticket-bg container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <p className="sell-h1 ">{title}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="event-list container">
          <div className="row">
            <div className="sub-nav">
              <ul>
                <li className="no_bg"><Link to="/">Home </Link></li>
                <li><a>{title}</a></li>
              </ul>
              <div className="clear"></div>
            </div>
            <div className="event-list-search  col-xs-12">
              <div className="event-list-content">
                <ul>
                  <RangeDateEventList events={eventListRangeDate.data.events} total={eventListRangeDate.data.total} />
                </ul>
              </div>
            </div>
          </div>
        </div>
        <AsSeenOn/>
        <Footer/>
      </div>
    );
  }
}

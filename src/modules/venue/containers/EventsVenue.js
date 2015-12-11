import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reFetch } from 'redux/modules/app';
import { EventList } from '../components';
import * as EventActions from 'redux/modules/event';
import * as VenueActions from 'redux/modules/venue';
import errorRedirect from 'helpers/errorRedirect';

@connect(
  state => ({
    venue: state.venue,
    eventList: state.eventListByVenue
  })
)
export default class EventsVenue extends React.Component {
  static propTypes = {
    venue: PropTypes.object.isRequired,
    eventList: PropTypes.object.isRequired
  }

  static onEnter(store) {
    return (nextState, transition) => {
      const { venue } = store.getState();

      if (venue.error) {
        errorRedirect(venue.error.status, transition);
      }
    };
  }

  static fetchData(store, state) {
    if (reFetch(store)) {
      return store.dispatch(VenueActions.getBySlug(state.params.id)).then(() => {
        const { venue } = store.getState();

        if (!venue.error) {
          return store.dispatch(EventActions.listByVenue(venue.data.id, -1, -1));
        }
      });
    }
  }

  render() {
    const { venue, eventList } = this.props;
    return (
      <div className="row">
        <h3>{venue.data.name}, {venue.data.city.name}</h3>
        <h3>Events</h3>
        <EventList events={eventList.data.events} total={eventList.data.total} />
      </div>
    );
  }
}

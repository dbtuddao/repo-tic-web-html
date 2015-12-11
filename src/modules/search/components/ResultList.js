import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

export default class ResultList extends React.Component {
  static propTypes = {
    searchResult: PropTypes.object.isRequired
  }

  listEvent(item) {
    return (
      <li key={item.id}>
        <Link to={`/event/${item.slug}`}>
          <span className="event-title">{item.name}, {item.venue}, {item.city}</span>
        </Link>
        <p>{item.date && moment(item.date).format('DD MMMM YYYY')}</p>
      </li>
    );
  }

  listVenue(item) {
    return (
      <li key={item.id}>
        <Link to={`/venue/${item.slug}/events`}>
          <span className="event-title">{item.name}, {item.city}</span>
        </Link>
      </li>
    );
  }

  listCity(item) {
    return (
      <li key={item.id}>
        <Link to={`/cities/${item.slug}/venues`}>
          <span className="event-title">{item.name}</span>
        </Link>
      </li>
    );
  }

  render() {
    const { searchResult } = this.props;
    let showEvents = <div/>;
    let showVenues = <div/>;
    let showCities = <div/>;
    if (searchResult.events.length) {
      showEvents = (
        <div className="row">
          <div className="event-list-search">
            <p>Event</p>
            <div className="event-list-content">
              <ul>{searchResult.events.map(::this.listEvent)}</ul>
            </div>
          </div>
        </div>
      );
    }
    if (searchResult.venues.length) {
      showVenues = (
        <div className="row">
          <div className="event-list-search">
            <p>Venue</p>
            <div className="event-list-content">
              <ul>{searchResult.venues.map(::this.listVenue)}</ul>
            </div>
          </div>
        </div>
      );
    }
    if (searchResult.cities.length) {
      showCities = (
        <div className="row">
          <div className="event-list-search">
            <p>City</p>
            <div className="event-list-content">
              <ul>{searchResult.cities.map(::this.listCity)}</ul>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="page-search-event col-xs-12">
        <div className="container">
          <div className="space space--sm"></div>
          {showEvents}
          {showVenues}
          {showCities}
        </div>
      </div>
    );
  }
}

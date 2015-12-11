import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class EventList extends React.Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired
  }

  listEvent(item) {
    return (
      <li key={item.id}>
        <Link to={`/event/${item.slug}`}>
          <span className="event-title"> {item.name}</span>
          <p>{item.venue.name}, {item.venue.city.name}</p>
        </Link>
      </li>
    );
  }

  render() {
    const { events } = this.props;
    let showEvents = <div/>;
    if (events.length) {
      showEvents = (
        <ul>
          {events.map(::this.listEvent)}
        </ul>
      );
    }
    return (
      <div>
        {showEvents}
      </div>
    );
  }
}

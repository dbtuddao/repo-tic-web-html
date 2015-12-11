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
        <p><Link to={`/event/${item.slug}`}>{item.name}</Link></p>
        <span>{item.fromDate}</span>
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

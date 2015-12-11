import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

export default class HomeEventList extends React.Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired
  }

  listEvent(item) {
    return (
      <li key={item.id}>
        <Link to={`/event/${item.slug}`}>
          <span className="upcoming-title">{item.name}</span>
          <span className="upcoming-sub">{moment(item.fromDate).format('dddd, MMMM, DD, YYYY')}</span>
          <span className="upcoming-sub">{item.venue.name + ' - ' + item.venue.city.name}</span>
        </Link>
      </li>
    );
  }

  render() {
    const { events } = this.props;
    const listEvent = this.listEvent.bind(this);

    if (events.length === 0) {
      return null;
    }

    const leftEvent = events.slice(0, Math.ceil(events.length / 2));
    const rightEvent = events.slice(Math.ceil(events.length / 2));

    return (
      <div className="upcoming-details">
        <div className="upcoming-content col-sm-6 col-xs-12">
          {leftEvent.length > 0 &&
            <ul>
              {leftEvent.map(listEvent)}
            </ul>
          }
        </div>
        <div className="upcoming-content rgt-block col-sm-6 col-xs-12 mob-none">
          {rightEvent.length > 0 &&
            <ul>
              {rightEvent.map(listEvent)}
            </ul>
          }
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}

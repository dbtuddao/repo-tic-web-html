import React, { PropTypes } from 'react';
import EventList from './EventList';
import EventControl from './EventControl';
import { Link } from 'react-router';

export default class RangeDateEvent extends React.Component {
  static propTypes = {
    onRangeDateChange: PropTypes.func.isRequired,
    events: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    eventType: PropTypes.string.isRequired
  }

  render() {
    const { events, eventType, total, onRangeDateChange } = this.props;
    return (
      <div className="upcoming-events space--xl container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h2 className="block-title">Upcoming Events</h2>
              <EventControl onChange={onRangeDateChange} eventType={eventType}/>
              <EventList events={events} total={total} />
              <div className="text-center">
                <Link style={{textAlign: 'center'}} className="btn btn-primary" to={`/event/${eventType}`}>More Events</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

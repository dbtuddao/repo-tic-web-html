import React, { PropTypes } from 'react';
import moment from 'moment';

export default class EventHeader extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired
  }

  render() {
    const { event } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="banner">
            <h1>{event.name}</h1>
            <p className="form-ban">{moment(event.fromDate).format('dddd, MMMM D, YYYY')}, {event.venue.name}</p>
          </div>
        </div>
      </div>
    );
  }
}

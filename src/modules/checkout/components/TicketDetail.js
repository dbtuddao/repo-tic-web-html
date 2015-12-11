import React, { PropTypes } from 'react';

export default class TicketDetail extends React.Component {
  static propTypes = {
    advertise: PropTypes.object.isRequired
  }

  render() {
    const { advertise } = this.props;
    const { event, ticketType, user } = advertise;
    return (
      <div>
        <h3>{event.name}</h3>
        <p>Location: {event.venue.name}, {event.venue.city.name}</p>
        <p>Ticket Type: {ticketType.name}</p>
        <p>Seller: {user.name}, {user.email}</p>
      </div>
    );
  }
}

import React from 'react';
import { Link } from 'react-router';

export default class TicketTypeList extends React.Component {
  render() {
    return (
      <div className="ticket-links">
        <ul>
          <li><Link to={`/category/concert-tickets/events`}>Concert Tickets</Link></li>
          <li><Link to={`/category/sports-tickets/events`}>Sports Tickets</Link></li>
          <li><Link to={`/category/theater-tickets/events`}>Theater Tickets</Link></li>
          <li><Link to={`/category/festival-tickets/events`}>Festival Tickets</Link></li>
          <li className="last"><Link to={`/category/other/events`}>Other Tickets</Link></li>
        </ul>
        <div className="clear"></div>
      </div>
    );
  }
}

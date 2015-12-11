import React, { PropTypes } from 'react';

export default class AvailableAdvertiseControl extends React.Component {
  static propTypes = {
    eventID: PropTypes.string.isRequired,
    ticketTypes: PropTypes.array.isRequired,
    onSelectAll: PropTypes.func.isRequired,
    onSelectTicketType: PropTypes.func.isRequired
  }

  state = {
    currentTicketType: null
  }

  onClick(eventID, ticketTypeID, e) {
    e.preventDefault();
    this.setState({currentTicketType: ticketTypeID});
    if (this.props.onSelectAll && ticketTypeID === null) {
      this.props.onSelectAll(eventID, 10, 0);
    }
    if (this.props.onSelectTicketType && ticketTypeID !== null) {
      this.props.onSelectTicketType(eventID, ticketTypeID, 10, 0);
    }
  }

  listTicketType(eventID, item, i) {
    const boundClick = this.onClick.bind(this, eventID, item.id);
    if (this.state.currentTicketType === item.id) {
      return (<li key={i}><a href="#" className="active" onClick={boundClick}>{item.name}</a></li>);
    }

    return (<li key={i}><a href="#" onClick={boundClick}>{item.name}</a></li>);
  }

  render() {
    const { eventID } = this.props;
    let ticketTypes = [];
    ticketTypes.push({id: null, name: 'All Tickets'});
    ticketTypes = ticketTypes.concat(this.props.ticketTypes);
    const listTicketType = this.listTicketType.bind(this, eventID);
    return (
      <div className="ticket-table">
        <div className="ticket-types">
          <ul>
              {ticketTypes.map(listTicketType)}
          </ul>
          <div className="clear"></div>
        </div>
      </div>
    );
  }
}

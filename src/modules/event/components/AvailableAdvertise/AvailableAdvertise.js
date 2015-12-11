import React, { PropTypes } from 'react';

// Components
import AvailableAdvertiseControl from './AvailableAdvertiseControl';
import AvailableAdvertiseList from './AvailableAdvertiseList';

export default class AvailableAdvertise extends React.Component {
  static propTypes = {
    ticketTypes: PropTypes.array.isRequired,
    event: PropTypes.object.isRequired,
    advertises: PropTypes.array.isRequired,
    onSelectAll: PropTypes.func.isRequired,
    onSelectTicketType: PropTypes.func.isRequired
  }

  render() {
    const { ticketTypes, event, advertises, onSelectAll, onSelectTicketType } = this.props;
    if (advertises.length === 0) {
      return null;
    }
    return (
      <div>
        <AvailableAdvertiseControl
          ticketTypes={ticketTypes}
          eventID={event.id}
          onSelectAll={onSelectAll}
          onSelectTicketType={onSelectTicketType}
        />
        <AvailableAdvertiseList event={event} advertises={advertises} />
      </div>
    );
  }
}

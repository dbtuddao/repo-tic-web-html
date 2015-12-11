import React, { PropTypes } from 'react';

export default class MostSoldEvent extends React.Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
  }

  onSelectEvent(id, e) {
    e.preventDefault();
    this.props.onSelect(id);
  }

  listEvent(item) {
    const onSelect = this.onSelectEvent.bind(this, item.id);
    return (
      <li key={item.id}><a href="#" onClick={onSelect}>{item.name}, {item.venue.name}</a></li>
    );
  }

  render() {
    const { events } = this.props;
    const listEvent = this.listEvent.bind(this);
    return (
       <div>
        <ul>
          {events && events.map(listEvent)}
        </ul>
       </div>
    );
  }
}

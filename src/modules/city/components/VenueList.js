import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class VenueList extends React.Component {
  static propTypes = {
    venues: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired
  }

  listVenue(item) {
    return (
      <li key={item.id}>
        <td><Link to={`/venue/${item.slug}/events`}>{item.name}</Link></td>
      </li>
    );
  }

  render() {
    const { venues } = this.props;
    let showVenues = <div/>;
    if (venues.length) {
      showVenues = (
        <ul>
          {venues.map(::this.listVenue)}
        </ul>
      );
    }
    return (
      <div>
        {showVenues}
      </div>
    );
  }
}

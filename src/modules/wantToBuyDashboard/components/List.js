import React, { PropTypes } from 'react';

export default class List extends React.Component {
  static propTypes = {
    wishLists: PropTypes.array.isRequired,
    onActivate: PropTypes.func.isRequired,
    onDeActivate: PropTypes.func.isRequired
  }

  handleActivate(id) {
    this.props.onActivate(id);
  }

  handleDeActivate(id) {
    this.props.onDeActivate(id);
  }

  listWishList(wishList, i) {
    const handleActivate = this.handleActivate.bind(this, wishList.id);
    const handleDeActivate = this.handleDeActivate.bind(this, wishList.id);
    return (
      <li key={i}>
        <div>
          <p>{wishList.event.name}, {wishList.event.venue.name} - {wishList.event.venue.city.name}</p>
          <p>{wishList.ticketType.name}</p>
          <p>{wishList.event.fromDate}</p>
          { wishList.active &&
            <p><button onClick={handleDeActivate} className="btn btn-danger">Deactivate</button></p>
          }
          { !wishList.active &&
            <p><button onClick={handleActivate} className="btn btn-success">Activate</button></p>
          }
        </div>
      </li>
    );
  }

  render() {
    const { wishLists } = this.props;
    const listWishList = this.listWishList.bind(this);
    return (
      <div>
        <ul>
          {wishLists && wishLists.map(listWishList)}
        </ul>
      </div>
    );
  }
}

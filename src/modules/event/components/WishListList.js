import React, { PropTypes } from 'react';
import { UserImage } from 'components';
import { Link } from 'react-router';

export default class WishListList extends React.Component {
  static propTypes = {
    wishLists: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired
  }

  listWishList(wishList) {
    return (
      <li key={wishList.id}>
        <Link to={`/want/${wishList.id}`}><UserImage fbID={wishList.user.fbID} name={wishList.user.name} /></Link>
      </li>
    );
  }

  render() {
    const { wishLists, total } = this.props;
    const listWishList = this.listWishList.bind(this);
    if (wishLists.length === 0) {
      return null;
    }
    // <input name="Show More" type="button" className="show-more people-more" value="Show More" />
    return (
      <div className="people-block">
        <h2>There are {total} people looking for ticket</h2>
        <ul>{wishLists.map(listWishList)}</ul>
        <div className="clear"></div>

      </div>
    );
  }
}

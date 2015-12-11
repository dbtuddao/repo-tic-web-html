import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from '../components';
import { reFetch } from 'redux/modules/app';
import * as WishListActions from 'redux/modules/wishList';
import { ErrorMessage } from 'components';

@connect(
  state => ({
    wishListListAllByUser: state.wishListListAllByUser,
    session: state.session,
    wishListActivate: state.wishListActivate,
    wishListDeActivate: state.wishListDeActivate
  })
)
export default class WishList extends React.Component {
  static propTypes = {
    wishListListAllByUser: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    wishListActivate: PropTypes.object.isRequired,
    wishListDeActivate: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  handleActivate(id) {
    const { session, dispatch } = this.props;
    dispatch(WishListActions.activate(session.data.auth.token, id));
  }

  handleDeActivate(id) {
    const { session, dispatch } = this.props;
    dispatch(WishListActions.deActivate(session.data.auth.token, id));
  }

  static fetchData(store) {
    const { session } = store.getState();
    if (reFetch(store) && session.data && session.data.auth) {
      return store.dispatch(WishListActions.listAllByUser(session.data.auth.token, -1, -1));
    }
  }

  render() {
    const { wishListListAllByUser, wishListActivate, wishListDeActivate } = this.props;
    const handleActivate = this.handleActivate.bind(this);
    const handleDeActivate = this.handleDeActivate.bind(this);
    return (
      <div>
        <h1>WishList</h1>
        <ErrorMessage error={wishListActivate.error} />
        <ErrorMessage error={wishListDeActivate.error} />
        <List wishLists={wishListListAllByUser.data.wishLists} onActivate={handleActivate} onDeActivate={handleDeActivate} />
      </div>
    );
  }
}

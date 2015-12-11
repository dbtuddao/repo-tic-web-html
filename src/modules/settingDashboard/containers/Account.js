import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reFetch } from 'redux/modules/app';
import * as UserActions from 'redux/modules/user';
import { Link } from 'react-router';
import { UserImage } from 'components';

@connect(
  state => ({
    user: state.user,
    session: state.session
  })
)
export default class Account extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static contextTypes = {
    store: PropTypes.object
  }

  static fetchData(store) {
    const { session } = store.getState();
    if (reFetch(store) && session.data && session.data.auth) {
      return store.dispatch(UserActions.me(session.data.auth.token));
    }
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <h1>Account Setting</h1>
        <div className="row">
          <div className="col-xs-12">
            <UserImage fbID={user.data.fbID} name={user.data.name} />
            <p>Name: {user.data.name}</p>
            <p>Email: {user.data.email}</p>
            <p>Country: {user.data.country}</p>
          </div>
          <div className="col-xs-12">
            <Link className="btn btn-default" to="/dashboard/setting/account/edit">Edit</Link>
          </div>
        </div>
      </div>
    );
  }
}

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reFetch } from 'redux/modules/app';
import * as UserAddressActions from 'redux/modules/userAddress';
import { Link } from 'react-router';
import { Address } from '../components';

@connect(
  state => ({
    listAddress: state.userAddressGetAll,
    session: state.session
  })
)
export default class Account extends React.Component {
  static propTypes = {
    listAddress: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static contextTypes = {
    store: PropTypes.object
  }

  static fetchData(store) {
    const { session } = store.getState();
    if (reFetch(store) && session.data && session.data.auth) {
      return store.dispatch(UserAddressActions.getAll(session.data.auth.token, -1, -1));
    }
  }

  handleDelete(id) {
    const { session, dispatch } = this.props;
    dispatch(UserAddressActions.remove(session.data.auth.token, id));
  }

  render() {
    const { listAddress } = this.props;
    const handleDelete = this.handleDelete.bind(this);

    return (
      <div>
        <h1>Address Setting</h1>
        <div className="row">
          <div className="col-xs-12">
            <Link className="btn btn-default" to="/dashboard/setting/address/create">New Address</Link>
          </div>
          <div className="col-xs-12">
            { listAddress.data && listAddress.data.userAddresses.map((address, i) => {
              return <Address address={address} key={i} onDelete={handleDelete} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { AddressForm } from '../components';
import { initialize } from 'redux-form';
import * as UserAddressActions from 'redux/modules/userAddress';

@connect(
  state => ({
    userAddressCreate: state.userAddressCreate,
    session: state.session
  })
)
export default class AddressUpdate extends React.Component {
  static propTypes = {
    userAddressCreate: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  }

  static fetchData(store, state) {
    const { session } = store.getState();

    return store.dispatch(UserAddressActions.get(session.data.auth.token, state.params.id)).then(() => {
      const { userAddress } = store.getState();
      return store.dispatch(initialize('editUserAddress', {
        address1: userAddress.data.address1,
        address2: userAddress.data.address2,
        city: userAddress.data.city,
        code: userAddress.data.code,
        country: userAddress.data.country
      }));
    });
  }

  handleSubmit(data) {
    const { dispatch, session } = this.props;
    const { router } = this.context;
    return dispatch(UserAddressActions.update(session.data.auth.token, router.state.params.id, data)).then(() => {
      router.transitionTo(`/dashboard/setting/address`);
    });
  }

  render() {
    const handleSubmit = this.handleSubmit.bind(this);

    return (
      <div className="row">
        <div className="col-xs-12">
          <h2>Update Address</h2>
        </div>
        <div className="col-xs-12">
          <AddressForm onSubmit={handleSubmit}>
            <Link to="/dashboard/setting/address" className="btn btn-default">Back</Link>
            <button type="submit" className="btn btn-default">Save</button>
          </AddressForm>
        </div>
      </div>
    );
  }
}

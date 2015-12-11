import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { AddressForm } from '../components';
import * as UserAddressActions from 'redux/modules/userAddress';

@connect(
  state => ({
    userAddressCreate: state.userAddressCreate,
    session: state.session
  })
)
export default class EditAccount extends React.Component {
  static propTypes = {
    userAddressCreate: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  }

  handleSubmit(data) {
    const { dispatch, session } = this.props;
    const { router } = this.context;
    return dispatch(UserAddressActions.create(session.data.auth.token, data)).then(() => {
      router.transitionTo(`/dashboard/setting/address`);
    });
  }

  render() {
    const handleSubmit = this.handleSubmit.bind(this);

    return (
      <div className="row">
        <div className="col-xs-12">
          <h2>Create Address</h2>
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

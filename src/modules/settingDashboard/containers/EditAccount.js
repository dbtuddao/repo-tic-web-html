import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { initialize } from 'redux-form';
import { EditAccountForm } from '../components';
import * as UserActions from 'redux/modules/user';

@connect(
  state => ({
    user: state.user,
    session: state.session
  })
)
export default class EditAccount extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  }

  static fetchData(store) {
    const { session } = store.getState();

    return store.dispatch(UserActions.me(session.data.auth.token)).then(() => {
      const { user } = store.getState();
      return store.dispatch(initialize('editAccount', {
        name: user.data.name,
        email: user.data.email,
        country: user.data.country
      }));
    });
  }

  handleSubmit(data) {
    const { dispatch, session } = this.props;
    const { router } = this.context;
    return dispatch(UserActions.update(session.data.auth.token, data)).then(() => {
      router.transitionTo(`/dashboard/setting/account`);
    });
  }

  render() {
    const handleSubmit = this.handleSubmit.bind(this);

    return (
      <div className="row">
        <div className="col-xs-12">
          <h2>Edit Account</h2>
        </div>
        <div className="col-xs-12">
          <EditAccountForm onSubmit={handleSubmit}>
            <Link to="/dashboard/setting/account" className="btn btn-default">Back</Link>
            <button type="submit" className="btn btn-default">Save</button>
          </EditAccountForm>
        </div>
      </div>
    );
  }
}

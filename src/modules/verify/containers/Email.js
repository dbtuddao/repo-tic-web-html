import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as UserActions from 'redux/modules/user';

@connect(
  state => ({
    userUpdateEmail: state.userUpdateEmail,
    session: state.session
  })
)
export default class Email extends React.Component {
  static propTypes = {
    userUpdateEmail: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  // static onEnter(store) {
  //   return (nextState, transition) => {
  //     const { userUpdateEmail } = store.getState();

  //     if (!userUpdateEmail.error) {
  //       transition.to('/dashboard/setting/account');
  //     }
  //   };
  // }

  static fetchData(store, state) {
    if (__SERVER__) {
      return store.dispatch(UserActions.updateEmail(state.params.token));
    }
  }

  render() {
    const { userUpdateEmail } = this.props;
    return (
      <div className="row">
        <div className="col-xs-12">
          <h1>Verify Email</h1>
          {userUpdateEmail.error && <h3>{userUpdateEmail.error.message}</h3>}
          {!userUpdateEmail.error && <h3>Your email is updated</h3>}
        </div>
      </div>
    );
  }
}

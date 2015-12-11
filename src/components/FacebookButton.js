import React, { PropTypes } from 'react';
import * as AuthActions from 'redux/modules/auth';
import * as SessionActions from 'redux/modules/session';
import { connect } from 'react-redux';
import Facebook from 'helpers/Facebook';

@connect(
  state => ({
    session: state.session
  })
)
export default class FacebookButton extends React.Component {

  static propTypes = {
    session: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    text: PropTypes.string,
    className: PropTypes.string
  }

  static contextTypes = {
    store: PropTypes.object
  }

  handleLogin(e) {
    const { dispatch } = this.props;
    e.preventDefault();
    Facebook.login('email,user_birthday,user_location,user_friends').then((res) => {
      return dispatch(AuthActions.login(res.facebookId, res.facebookToken)).then(() => {
        const { login } = this.context.store.getState();
        if (!login.error) {
          return dispatch(SessionActions.save('auth', login.data));
        }
      });
    });
  }

  handleLogout(e) {
    const { session, dispatch } = this.props;
    e.preventDefault();
    dispatch(AuthActions.logout(session.data.auth.token)).then(() => {
      return dispatch(SessionActions.clear());
    });
  }

  render() {
    const { text, className, session } = this.props;
    const handleLogin = this.handleLogin.bind(this);
    const handleLogout = this.handleLogout.bind(this);

    if (session.data) {
      return (<a href="#" onClick={handleLogout}>Logout</a>);
    }

    if (session.loading) {
      return (<a>Logging in</a>);
    }

    return (
      <a href="#" className={className} onClick={handleLogin}>{text ? text : 'Login'}</a>
    );
  }
}

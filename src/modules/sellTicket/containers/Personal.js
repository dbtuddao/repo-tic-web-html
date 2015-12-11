import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { initialize } from 'redux-form';
import { PersonalForm } from '../components';
import * as SellTicketActions from 'redux/modules/sellTicket';
import * as UserActions from 'redux/modules/user';
import * as SessionActions from 'redux/modules/session';

@connect(
  state => ({
    sellTicket: state.sellTicket
  })
)
export default class Personal extends React.Component {
  static propTypes = {
    sellTicket: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  }

  static fetchData(store) {
    const { sellTicket, session } = store.getState();
    if (sellTicket.data.personal) {
      return store.dispatch(initialize('sellTicketPersonal', {
        ...sellTicket.data.personal
      }));
    }

    return store.dispatch(UserActions.me(session.data.auth.token)).then((res) => {
      return store.dispatch(initialize('sellTicketPersonal', {
        name: res.payload.name,
        email: res.payload.email,
        country: res.payload.country
      }));
    });
  }

  handleSubmit(data) {
    const { dispatch } = this.props;
    const { router } = this.context;
    dispatch(SellTicketActions.savePersonal(data));
    const { sellTicket } = this.context.store.getState();
    return dispatch(SessionActions.save('sellTicket', sellTicket.data)).then(() => {
      router.transitionTo(`/sell/ticket/promotion`);
    });
  }

  render() {
    const handleSubmit = this.handleSubmit.bind(this);

    return (
      <div className="row">
        <div className="col-xs-12">
          <h2>Personal Information</h2>
        </div>
        <div className="col-xs-12">
          <PersonalForm onSubmit={handleSubmit}>
            <Link to="/sell/ticket/ticket" className="btn btn-default">Back</Link>
            <button type="submit" className="btn btn-default">Next</button>
          </PersonalForm>
        </div>
      </div>
    );
  }
}

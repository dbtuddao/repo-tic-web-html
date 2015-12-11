import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reFetch } from 'redux/modules/app';
import * as WishListActions from 'redux/modules/wishList';
import * as EventActions from 'redux/modules/event';
import * as TicketTypeActions from 'redux/modules/ticketType';
import errorRedirect from 'helpers/errorRedirect';
import { ErrorMessage } from 'components';
import Facebook from 'helpers/Facebook';

import {
  Header,
  Footer,
  AsSeenOn,
  ShortFeature,
  PeopleSay
} from 'components';

import {
  EventHeader,
  RequestTicketForm
} from '../components';

@connect(
  state => ({
    wishListCreate: state.wishListCreate,
    event: state.event,
    session: state.session,
    ticketTypeList: state.ticketTypeListAllByEvent
  })
)
export default class RequestTicket extends React.Component {
  static propTypes = {
    wishListCreate: PropTypes.object.isRequired,
    ticketTypeList: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    event: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.object
  }

  static onEnter(store) {
    return (nextState, transition) => {
      const { event } = store.getState();
      if (event.error) {
        errorRedirect(event.error.status, transition);
      }
    };
  }

  static fetchData(store, state) {
    if (reFetch(store)) {
      return store.dispatch(EventActions.getBySlug(state.params.id)).then(() => {
        const { event } = store.getState();
        return store.dispatch(TicketTypeActions.listAllByEvent(event.data.id));
      });
    }
  }

  handleSave(data) {
    const { session, event, dispatch } = this.props;
    const { router } = this.context;
    if (data.fbwall) {
      Facebook.getAccessToken().then((fbtoken) => {
        dispatch(WishListActions.create(session.data.auth.token, fbtoken, event.data.id, data)).then((res)=>{
          if (!res.error) {
            router.transitionTo(`/event/${event.data.slug}`);
          }
        });
      });
    } else {
      dispatch(WishListActions.create(session.data.auth.token, '', event.data.id, data)).then((res)=>{
        if (!res.error) {
          this.context.router.transitionTo(`/event/${event.data.slug}`);
        }
      });
    }
  }

  render() {
    const { event, ticketTypeList, wishListCreate, session } = this.props;

    return (
      <div>
        <Header>
           <EventHeader event={event.data} />
        </Header>
        <div className="main-content col-xs-12">
          <div className="container">
            <div className="row">
              <h2>I&#39;m looking for {event.data.name}</h2>
              <ErrorMessage error={wishListCreate.error}/>
              <RequestTicketForm
                ticketTypes={ticketTypeList.data.ticketTypes}
                session={session.data}
                onSubmit={this.handleSave.bind(this)}
              />
            </div>
          </div>
        </div>
        <PeopleSay />
        <ShortFeature />
        <div className="clear"></div>
        <AsSeenOn />
        <div className="clear"></div>
        <Footer />
      </div>
    );
  }
}

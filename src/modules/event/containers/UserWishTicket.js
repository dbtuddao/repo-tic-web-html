import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reFetch } from 'redux/modules/app';
import * as WishListActions from 'redux/modules/wishList';
import * as SellTicketActions from 'redux/modules/sellTicket';
import errorRedirect from 'helpers/errorRedirect';
import { EventHeader } from '../components';
import DocumentMeta from 'react-document-meta';

import {
  Header,
  Footer,
  AsSeenOn,
  ShortFeature,
  PeopleSay
} from 'components';

@connect(
  state => ({
    wishList: state.wishList
  })
)
export default class UserWishTicket extends React.Component {
  static propTypes = {
    wishList: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object
  }

  static onEnter(store) {
    return (nextState, transition) => {
      const { wishList } = store.getState();
      if (wishList.error) {
        console.log('redirect', wishList.error);
        errorRedirect(wishList.error.status, transition);
      }
    };
  }

  static fetchData(store, state) {
    if (reFetch(store)) {
      return store.dispatch(WishListActions.get(state.params.id));
    }
  }

  goToSellTicket(e) {
    e.preventDefault();
    this.props.dispatch(SellTicketActions.fromEvent(this.props.wishList.data.event));
    this.context.router.transitionTo(`/sell/ticket`);
  }

  render() {
    const { wishList } = this.props;
    const goToSellTicket = this.goToSellTicket.bind(this);

    const title = `Wanted: ${wishList.data.qty} for ${wishList.data.event.name}`;

    const meta = {
      title,
      meta: {
        property: {
          'og:title': title,
          'og:image': 'https://www.ticketswap.nl/images/facebook-image.png',
          'og:image:width': '1200',
          'og:image:height': '630',
          'og:description': wishList.data.comment,
          'og:type': 'website',
          'og:site_name': 'Ticketlister'
        }
      }
    };

    return (
      <div>
        <DocumentMeta {...meta}/>
        <Header>
           <EventHeader event={wishList.data.event} />
        </Header>
        <div className="main-content col-xs-12">
          <div className="container">
            <div className="row">
              <h2>Wanted: {wishList.data.qty} for {wishList.data.event.name}, {wishList.data.ticketType.name}</h2>
              <p>Comment: {wishList.data.comment}</p>
              <div className="well">
                <p>Do you have 1 or more tickets for {wishList.data.event.name}?</p>
                <a className="btn btn-success" href="javascript:;" onClick={goToSellTicket}>Sell your e-ticket</a>
              </div>
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

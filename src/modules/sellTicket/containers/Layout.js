import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { SmallHeader, AsSeenOn, PeopleSay, Footer } from 'components';
import * as SellTicketActions from 'redux/modules/sellTicket';

@connect(
  state => ({
    sellTicket: state.sellTicket
  })
)
export default class Layout extends React.Component {
  static propTypes = {
    sellTicket: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
  }

  static onEnter(store) {
    return (nextState, transition) => {
      const { sellTicket, session } = store.getState();

      if (!session.data || !sellTicket.data) {
        transition.to('/sell/ticket');
      }
    };
  }

  static fetchData(store) {
    const { sellTicket, session } = store.getState();
    if (!sellTicket.data) {
      if (!session.data) {
        return Promise.reject();
      }

      if (!session.data.sellTicket) {
        return Promise.reject();
      }

      return store.dispatch(SellTicketActions.updateSellTicket(session.data.sellTicket));
    }
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <SmallHeader/>
        <div className="container-fluid">
          <div className="container">
            {children}
          </div>
        </div>
        <PeopleSay />
        <AsSeenOn />
        <Footer />
      </div>
    );
  }
}

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { SmallHeader, Footer } from 'components';

export default class Dashboard extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
  }

  componentDidMount() {
    jQuery(window).scroll(() => {
      if (jQuery(window).scrollTop() > 100) {
        jQuery('.top-scroll').fadeIn();
      } else {
        jQuery('.top-scroll').fadeOut();
      }
    });

    jQuery('.top-scroll').click(() => {
      jQuery('html, body').animate({
        scrollTop: 0
      }, 600);
      return false;
    });
  }

  static onEnter(store) {
    return (nextState, transition) => {
      const { session } = store.getState();

      if (!session.data) {
        transition.to('/');
      }
    };
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <SmallHeader/>
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <h3>Wish List</h3>
              <ul className="nav nav-pills nav-stacked">
                <li><Link to="/dashboard/wishlist">Wish List</Link></li>
              </ul>
              <h3>Purchase</h3>
              <ul className="nav nav-pills nav-stacked">
                <li><Link to="/dashboard/purchase">Purchase History</Link></li>
              </ul>
              <h3>Purchase</h3>
              <ul className="nav nav-pills nav-stacked">
                <li><Link to="/sell/ticket">Sell Ticket</Link></li>
                <li><Link to="/dashboard/sell/listing">Listing</Link></li>
                <li><Link to="/dashboard/sell/sales">Sales</Link></li>
                <li><Link to="/dashboard/sell/payment">Payments</Link></li>
              </ul>
              <h3>Setting</h3>
              <ul className="nav nav-pills nav-stacked">
                <li><Link to="/dashboard/setting/account">Account Settings</Link></li>
                <li><Link to="/dashboard/setting/address">Address</Link></li>
                <li><Link to="/dashboard/setting/payment">Payment Methods</Link></li>
              </ul>
            </div>
            <div className="col-md-10">
              {children}
            </div>
          </div>
        </div>
        <div className="sub"/>
        <div className="top-scroll">
          <img src="/images/arrow2.png" width="28" height="20" alt="top"/>
        </div>
        <Footer/>
      </div>
    );
  }
}

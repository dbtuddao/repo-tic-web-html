import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import FacebookButton from './FacebookButton.js';
import { connect } from 'react-redux';

@connect(
  state => ({
    session: state.session
  })
)
export default class Header extends React.Component {
  static propTypes = {
    fullPage: PropTypes.bool,
    session: PropTypes.object,
    children: PropTypes.object
  }

  componentDidMount() {
    jQuery('#nav').clone().appendTo('.sub');
    jQuery('#mobile_menu').click(() => {
      jQuery('body').toggleClass('open');
    });

    jQuery('#go-to-feature').click(() => {
      jQuery('html, body').animate({ scrollTop: jQuery('.main-content').offset().top }, 400);
    });
  }

  render() {
    const { session, children } = this.props;

    let nav = [
      (<a href="#">Howto</a>),
      (<a href="#">Faq</a>)
    ];

    if (session.data) {
      nav = nav.concat(
        (<Link to="/dashboard/wishlist/search">Dashboard</Link>),
        (<Link className="tickerts" to="/sell/ticket">SELL YOUR TICKETS</Link>),
        (<FacebookButton />)
      );
    } else {
      nav = nav.concat(
        (<FacebookButton />)
        // (<a href="#" className="flag"><img src="/images/flag.jpg" width="28" height="20" alt="flag"/></a>)
      );
    }

    const { fullPage } = this.props;

    return (
      <div className="container-fluid banner-bg" style={{height: fullPage ? '100vh' : '100%'}}>
        <div className="header-bg">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <div className="header">
                  <div id="logo">
                    <Link className="logo__text" to="/">Ticketlister</Link>
                  </div>
                  <div id="mobile_menu" className="items"><button className="cmn-toggle-switch cmn-toggle-switch__htx"><span></span></button></div>
                  <div id="nav">
                    <ul>
                      {nav.map((item, i) => (<li key={i}>{item}</li>))}
                    </ul>
                  </div>
                  <div className="clear"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <a id="go-to-feature" href="#" className="banner-arrow"><img src="/images/arrow2.png" width="46" height="46" alt="arrow"/></a>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

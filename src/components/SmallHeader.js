import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import FacebookButton from './FacebookButton.js';
import { connect } from 'react-redux';

@connect(
  state => ({
    session: state.session
  })
)
export default class SmallHeader extends React.Component {
  static propTypes = {
    session: PropTypes.object
  }

  componentDidMount() {
    jQuery('#nav').clone().appendTo('.sub');
    jQuery('#mobile_menu').click(() => {
      jQuery('body').toggleClass('open');
    });
  }

  render() {
    const { session } = this.props;

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
      );
    }

    return (
      <div className="container-fluid inner-bg-sellticket" style={{padding: '0'}}>
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
      </div>
    );
  }
}

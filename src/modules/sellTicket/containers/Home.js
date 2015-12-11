import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { SmallHeader, AsSeenOn, PeopleSay, Footer, FacebookButton } from 'components';
import * as SellTicketActions from 'redux/modules/sellTicket';
import * as SessionActions from 'redux/modules/session';

@connect(
  state => ({
    session: state.session,
    sellTicket: state.sellTicket
  })
)
export default class Home extends React.Component {
  static propTypes = {
    session: PropTypes.object.isRequired,
    sellTicket: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  }

  handlerNext() {
    const { dispatch } = this.props;
    const { router, store } = this.context;
    dispatch(SellTicketActions.newWizard());

    const { sellTicket } = store.getState();
    dispatch(SessionActions.save('sellTicket', sellTicket.data)).then(() => {
      if (sellTicket.data.event) {
        router.transitionTo(`/sell/ticket/event`);
      } else {
        router.transitionTo(`/sell/ticket/event`);
      }
    });
  }

  render() {
    const { session } = this.props;
    const handlerNext = this.handlerNext.bind(this);

    let nextButton = <FacebookButton text="Login with Facebook" />;
    if (session.data) {
      nextButton = (<button onClick={handlerNext} className="btn btn-success btn-lg-rect btn-rect">Next Step <img src="/images/nextstep-icon.png" width="24" height="24" alt="nofication"/></button>);
    }

    return (
      <div>
        <SmallHeader/>
        <div className="center-block col-xs-12" >
          <div className="container">
            <div className="row">
              <div className="sellticket-step1">
                <div className="sell-h2">Sell your e-ticket using Tixx and you&#39;ll receive your money guaranteed </div>
                <p>Selling your e-tickets with us it garanteed money!  Start Selling now by
                 Uploading your original e-ticket PDF file Select event or add event info ,
                 select the ticket you want to sell  ,set your price , confirm your detail and
                 you are ready sell your tickets! </p>
              </div>
              <div className="space"></div>
              <div className="feature col-md-11 col-xs-12">
                <section className="container">
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="feature">
                        <div className="feature__image feature__image--page">
                          <img src="/images/sellticket-icon-1.png" alt="" />
                        </div>
                        <h3 className="feature__heading editContent">feature</h3>
                        <p className="feature__info editContent">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in lacinia quam. Fusce quis nulla tincidunt, interdum magna vitae, viverra est. Nunc eu sodales turpis, varius viverra mauris.</p>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="feature">
                        <div className="feature__image feature__image--page">
                          <img src="/images/sellticket-icon-2.png" alt="" />
                        </div>
                        <h3 className="feature__heading editContent">feature</h3>
                        <p className="feature__info editContent">Aenean porta, elit vitae tristique consequat, nisi tellus tincidunt erat, sit amet interdum elit quam at velit. Mauris venenatis metus sed purus tincidunt placerat. </p>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="feature">
                        <div className="feature__image feature__image--page">
                          <img src="/images/sellticket-icon-3.png" alt="" />
                        </div>
                        <h3 className="feature__heading editContent">feature</h3>
                        <p className="feature__info editContent">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in lacinia quam. Fusce quis nulla tincidunt, interdum magna vitae, viverra est. Nunc eu sodales turpis, varius viverra mauris.</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
        <div className="clear"></div>
        <div className="space"></div>
        <div className="container">
          <div className="row">
            <div className="center-block">
              <div className="alert alert-success alert-visible">
                <div className="btn-container">
                  <div className="btn-container-button">
                    {nextButton}
                  </div>
                </div>
                <span className="alert-market">
                  <img src="/images/nofication-icon.png" width="24" height="24" alt="nofication"/>
                </span>
                <strong>Start Selling your Ticket!</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="clear"></div>
        <div className="space"></div>
        <PeopleSay />
        <AsSeenOn />
        <Footer />
      </div>
    );
  }
}

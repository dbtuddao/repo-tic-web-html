import React, { PropTypes } from 'react';
import { SmallHeader, Footer } from 'components';

export default class Verify extends React.Component {
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

  render() {
    const { children } = this.props;
    return (
      <div>
        <SmallHeader/>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
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

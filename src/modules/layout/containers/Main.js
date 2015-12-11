import React, { PropTypes } from 'react';

export default class Main extends React.Component {
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
        {children}
        <div className="sub"/>
        <div className="top-scroll">
          <img src="/images/arrow2.png" width="28" height="20" alt="top"/>
        </div>
      </div>
    );
  }
}

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class HomeEventFeature extends React.Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired
  }

  componentDidMount() {
    jQuery('.feature-slider').show();
    jQuery('.feature-slider').slick({
      autoplay: true,
      autoplaySpeed: 5000,
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 3,
      infinite: true,
      dots: true,
      arrows: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '0',
            slidesToShow: 3
          }
        }
      ]
    });
  }

  listEvent(event) {
    return (
      <div key={event.id}>
        <div className="box">
          <Link to={`/event/${event.slug}`}>
            <img src="/images/features-imag1.jpg" width="100%" />
            <h4>{event.name}</h4>
          </Link>
        </div>
      </div>
    );
  }

  render() {
    const { events } = this.props;
    const listEvent = this.listEvent.bind(this);

    return (
      <div className="feature-events container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h2 className="block-title">Featured Events</h2>
              <div className="feature-slider" style={{display: 'none'}}>
                {events && events.map(listEvent)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

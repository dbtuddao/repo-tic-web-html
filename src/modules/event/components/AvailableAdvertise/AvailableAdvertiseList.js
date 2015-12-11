import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { UserImage } from 'components';

export default class AvailableAdvertiseList extends React.Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    advertises: PropTypes.array.isRequired
  }

  listAdvertise(event, advertise) {
    return (
      <Link key={advertise.id} to={`/ticket/${advertise.id}`}>
        <ul>
          <li>
              <div className="general">
                <h4>{advertise.ticketType.name}</h4>
              </div>
              <div className="mystland">
                <h4>{event.name}</h4>
                <h5>{advertise.description}</h5>
              </div>
              <strong className="clear"></strong>
          </li>
          <li>
            <div className="tichets">
              <span>{advertise.qty}</span>
              <strong className="clear"></strong>
            </div>
            <div className="price">
              <span>A$ {advertise.sellPrice}<em>per ticket</em></span>
            </div>
            <strong className="clear"></strong>
          </li>
          <li>
            <div className="seller">
              <UserImage fbID={advertise.user.fbID} name={advertise.user.name} />
              <span>{advertise.user.name}</span>
              <strong className="clear"></strong>
              <small></small>
            </div>
          </li>
        </ul>
        <div className="clear"></div>
      </Link>
    );
  }

  render() {
    const { event, advertises } = this.props;
    const listAdvertise = this.listAdvertise.bind(this, event);
    return (
      <div className="table-content">
        <div className="table-head">
          <ul>
            <li><h6>Event</h6></li>
              <li><h6>Type of Tickets</h6></li>
              <li><h6>Tickets available</h6></li>
              <li><h6>Seller's Price <em>Per Ticket</em></h6></li>
              <li><h6>Seller<span>'s Price</span></h6></li>
          </ul>
          <div className="clear"></div>
        </div>
        <div className="table-con">
          {advertises.map(listAdvertise)}
          <input name="show-more" type="button" className="show-more" value="Show More Tickets"/>
        </div>
      </div>
    );
  }
}

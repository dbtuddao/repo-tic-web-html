import React, { PropTypes } from 'react';
import moment from 'moment';

export default class PaymentList extends React.Component {
  static propTypes = {
    payment: PropTypes.object.isRequired,
    onExpand: PropTypes.func
  }

  handleClick(id, e) {
    jQuery(this.expand.getDOMNode()).toggle();

    const expandBtn = jQuery(e.target);
    if (expandBtn.text() === 'Expand') {
      expandBtn.text('Collapse');
    } else {
      expandBtn.text('Expand');
    }

    if (this.props.onExpand) {
      this.props.onExpand(id);
    }
  }

  render() {
    const { payment } = this.props;
    const handleClick = this.handleClick.bind(this, payment.id);

    return (
      <div>
        <div className="row">
          <div className="col-md-2" style={{wordWrap: 'break-word'}}>{payment.id}</div>
          <div className="col-md-2">{payment.advertise.event.name}, {payment.advertise.event.venue.name}, {payment.advertise.event.venue.city.name}</div>
          <div className="col-md-2">{moment(payment.ctime).format('lll')}</div>
          <div className="col-md-2">{payment.amount}</div>
          <div className="col-md-2">{payment.status}</div>
          <div className="col-md-2"><a href="javascript:;" onClick={handleClick}>More Detail</a></div>
        </div>
        <div className="row" ref={(ref) => this.expand = ref } style={{display: 'none'}}>
          {payment.id}
        </div>
      </div>
    );
  }
}

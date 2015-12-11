import React, { PropTypes } from 'react';
import moment from 'moment';

export default class SalesList extends React.Component {
  static propTypes = {
    order: PropTypes.object.isRequired,
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
    const { order } = this.props;
    const handleClick = this.handleClick.bind(this, order.id);

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <p>Event: {order.advertise.event.name}, {moment(order.advertise.event.fromDate).format('lll')}, {order.advertise.event.venue.name}, {order.advertise.event.venue.city.name}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">{moment(order.ctime).format('lll')}</div>
          <div className="col-md-2" style={{wordWrap: 'break-word'}}>{order.id}</div>
          <div className="col-md-2" style={{wordWrap: 'break-word'}}>{order.advertise.id}</div>
          <div className="col-md-2">{order.tickets.length}</div>
          <div className="col-md-2">{order.amount}</div>
          <div className="col-md-2"><a href="javascript:;" onClick={handleClick}>More Detail</a></div>
        </div>
        <div className="row" ref={(ref) => this.expand = ref } style={{display: 'none'}}>
          {order.id}
        </div>
      </div>
    );
  }
}

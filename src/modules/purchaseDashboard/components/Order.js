import React, { PropTypes } from 'react';
import Detail from './Detail';
import moment from 'moment';

export default class Order extends React.Component {
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
          <div className="col-md-2">{order.advertise.event.name}, {order.advertise.event.venue.name}, {order.advertise.event.venue.city.name}</div>
          <div className="col-md-2">{moment(order.advertise.event.fromDate).format('lll')}</div>
          <div className="col-md-2">{order.qty}</div>
          <div className="col-md-2" style={{wordWrap: 'break-word'}}>{order.id}</div>
          <div className="col-md-2">{moment(order.ctime).format('lll')}</div>
          <div className="col-md-2">{order.amount}</div>
        </div>
        <div className="row">
          <div className="col-md-10 text-center"><a href={`/Download/PdfOrder/${order.id}`} target="_blank">Download Tickets</a></div>
          <div className="col-md-2 text-center"><a href="javascript:;" onClick={handleClick}>Expand</a></div>
        </div>
        <div className="row" ref={(ref) => this.expand = ref } style={{display: 'none'}}>
          {order.tickets && order.tickets.length &&
            order.tickets.map((ticket, i) => {
              return <Detail key={i} ticket={ticket} />;
            })
          }
        </div>
      </div>
    );
  }
}

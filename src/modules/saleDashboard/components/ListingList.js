import React, { PropTypes } from 'react';
import ListingDetail from './ListingDetail';
import moment from 'moment';

export default class ListingList extends React.Component {
  static propTypes = {
    advertise: PropTypes.object.isRequired,
    onRemove: PropTypes.func,
    onEdit: PropTypes.func,
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

  handleRemove(id) {
    if (this.props.onRemove) {
      this.props.onRemove(id);
    }
  }

  handleEdit(id) {
    if (this.props.onEdit) {
      this.props.onEdit(id);
    }
  }

  render() {
    const { advertise } = this.props;
    const handleClick = this.handleClick.bind(this, advertise.id);
    const handleRemove = this.handleRemove.bind(this, advertise.id);
    const handleEdit = this.handleEdit.bind(this, advertise.id);

    return (
      <div>
        <div className="row">
          <div className="col-md-2">{advertise.event.name}, {advertise.event.venue.name}, {advertise.event.venue.city.name}</div>
          <div className="col-md-2" style={{wordWrap: 'break-word'}}>{advertise.id}</div>
          <div className="col-md-2">{moment(advertise.ctime).format('lll')}</div>
          <div className="col-md-2">{advertise.totalQty}</div>
          <div className="col-md-2">{advertise.totalQty - advertise.qty}</div>
          <div className="col-md-2">{advertise.qty}</div>
          <div className="col-md-2">{advertise.sellPrice}</div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <span>Status: {advertise.status}</span>&nbsp;
            <a href="javascript:;" onClick={handleEdit}>Edit</a>&nbsp;
            <a href="javascript:;" onClick={handleRemove}>Remove</a>&nbsp;
            <a href="javascript:;" onClick={handleClick}>More Detail</a>
          </div>
        </div>
        <div className="row" ref={(ref) => this.expand = ref } style={{display: 'none'}}>
          {advertise.tickets && advertise.tickets.length &&
            advertise.tickets.map((ticket, i) => {
              return <ListingDetail key={i} ticket={ticket} />;
            })
          }
        </div>
      </div>
    );
  }
}

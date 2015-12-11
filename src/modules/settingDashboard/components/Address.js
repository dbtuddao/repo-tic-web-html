import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class PaymentMethod extends React.Component {
  static propTypes = {
    address: PropTypes.object.isRequired,
    onDelete: PropTypes.func
  }

  handleDelete(id) {
    if (this.props.onDelete) {
      this.props.onDelete(id);
    }
  }

  render() {
    const { address } = this.props;
    const handleDelete = this.handleDelete.bind(this, address.id);

    return (
      <div className="row" style={{margin: '20px 0', backgroundColor: '#EEEEEE', padding: '10px 0'}}>
        <div className="col-xs-2">Address</div>
        <div className="col-xs-10">
          <p>{address.address1}</p>
          <p>{address.address2}</p>
        </div>

        <div className="col-xs-2">City</div>
        <div className="col-xs-10">
          <p>{address.city}</p>
        </div>

        <div className="col-xs-2">Country</div>
        <div className="col-xs-10">
          <p>{address.country}</p>
        </div>

        <div className="col-xs-2">Post code</div>
        <div className="col-xs-10">
          <p>{address.code}</p>
        </div>

        <div className="col-xs-12">
          <Link to={`/dashboard/setting/address/edit/${address.id}`} >Edit</Link>
          &nbsp;
          <a href="javascript:;" onClick={handleDelete}>Delete</a>
        </div>
      </div>
    );
  }
}

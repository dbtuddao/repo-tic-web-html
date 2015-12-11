import React, { PropTypes } from 'react';

export default class CartSummary extends React.Component {
  static propTypes = {
    qty: PropTypes.number.isRequired,
    subtotal: PropTypes.string.isRequired,
    sellPrice: PropTypes.string.isRequired,
    vatPercent: PropTypes.string.isRequired,
    vat: PropTypes.string.isRequired,
    serviceFee: PropTypes.string.isRequired,
    grandTotal: PropTypes.string.isRequired,
  }

  render() {
    const { qty, subtotal, sellPrice, vatPercent, vat, serviceFee, grandTotal } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <table className="table">
            <tbody>
              <tr>
                <th>Number of Tickets</th>
                <td>{qty}</td>
              </tr>
              <tr>
                <th>Price/Ticket</th>
                <td>{sellPrice}</td>
              </tr>
              <tr>
                <th>Subtotal</th>
                <td>{subtotal}</td>
              </tr>
              <tr>
                <th>Service Fee</th>
                <td>{serviceFee}</td>
              </tr>
              <tr>
                <th>VAT {vatPercent}%</th>
                <td>{vat}</td>
              </tr>
              <tr>
                <th>Grand Total</th>
                <td>{grandTotal}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

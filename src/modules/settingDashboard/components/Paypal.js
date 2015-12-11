import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as PaymentMethodActions from 'redux/modules/paymentMethod';
import { PaypalForm } from '../components';
import { ErrorMessage } from 'components';

@connect(
  state => ({
    paypal: state.paymentMethodPaypal,
    paypalUpsert: state.paymentMethodUpsertPaypal,
    session: state.session
  })
)
export default class PaymentMethod extends React.Component {
  static propTypes = {
    paypal: PropTypes.object.isRequired,
    paypalUpsert: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    isEdit: false
  }

  handleSubmitPaypal(data) {
    const { dispatch, session } = this.props;
    return dispatch(PaymentMethodActions.upsert(session.data.auth.token, data.email)).then(() => {
      this.setState({isEdit: false});
    });
  }

  handleClickEdit() {
    this.setState({isEdit: true});
  }

  handleClickCancel() {
    this.setState({isEdit: false});
  }

  render() {
    const { paypal, paypalUpsert } = this.props;
    const { isEdit } = this.state;
    const handleSubmitPaypal = this.handleSubmitPaypal.bind(this);
    const handleClickEdit = this.handleClickEdit.bind(this);
    const handleClickCancel = this.handleClickCancel.bind(this);
    let paypalContent = null;

    if (isEdit) {
      paypalContent = (
        <PaypalForm onSubmit={handleSubmitPaypal}>
          <a href="javascript:;" className="btn btn-default" onClick={handleClickCancel}>Cancel</a>
          &nbsp;
          <button type="submit" className="btn btn-default">Save</button>
        </PaypalForm>
      );
    } else {
      paypalContent = (
        <div>
          <p>Email: {paypal.data ? paypal.data.email : '-'}</p>
          <a href="javascript:;" onClick={handleClickEdit}>Edit</a>
        </div>
      );
    }

    return (
      <div>
        <h3>Get paid with Paypal</h3>
        <div className="row">
          <div className="col-xs-12">
            <ErrorMessage error={paypalUpsert.error} />
            {paypalContent}
          </div>
        </div>
      </div>
    );
  }
}

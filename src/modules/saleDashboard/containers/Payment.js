import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { SearchForm, PaymentFilter, PaymentList } from '../components';
import { reFetch } from 'redux/modules/app';
import * as PaymentActions from 'redux/modules/payment';

@connect(
  state => ({
    listPayment: state.paymentListAllByUser,
    paymentFilter: state.paymentFilter,
    session: state.session
  })
)
export default class Payment extends React.Component {
  static propTypes = {
    listPayment: PropTypes.object.isRequired,
    paymentFilter: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static contextTypes = {
    store: PropTypes.object
  }

  handleSearchSubmit(form) {
    const { dispatch, session } = this.props;
    dispatch(PaymentActions.setSearch(form.search));
    const { paymentFilter } = this.context.store.getState();
    dispatch(PaymentActions.listByUser(session.data.auth.token, paymentFilter.search || '', paymentFilter.filter, -1, -1));
  }

  handleFilterClick(filter) {
    const { dispatch, session } = this.props;
    dispatch(PaymentActions.setFilter(filter));
    const { paymentFilter } = this.context.store.getState();
    dispatch(PaymentActions.listByUser(session.data.auth.token, paymentFilter.search || '', paymentFilter.filter, -1, -1));
  }

  static fetchData(store) {
    const { session } = store.getState();
    if (reFetch(store) && session.data && session.data.auth) {
      return store.dispatch(PaymentActions.listByUser(session.data.auth.token, '', '', -1, -1));
    }
  }

  render() {
    const { listPayment, paymentFilter } = this.props;
    const handleSearchSubmit = this.handleSearchSubmit.bind(this);
    const handleFilterClick = this.handleFilterClick.bind(this);

    return (
      <div>
        <h1>Sales</h1>
        <SearchForm onSubmit={handleSearchSubmit} />
        <PaymentFilter onClick={handleFilterClick} value={paymentFilter.filter || ''} />
        {listPayment.data.payments && listPayment.data.payments.map((payment, i)=>{
          return (<PaymentList key={i} payment={payment} />);
        })}
      </div>
    );
  }
}

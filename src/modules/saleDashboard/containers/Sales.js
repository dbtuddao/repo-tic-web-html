import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { SearchAndDateForm, SalesFilter, SalesList } from '../components';
import { reFetch } from 'redux/modules/app';
import * as OrderActions from 'redux/modules/order';

@connect(
  state => ({
    listOrder: state.orderListSeller,
    salesFilter: state.salesFilter,
    session: state.session
  })
)
export default class Sales extends React.Component {
  static propTypes = {
    listOrder: PropTypes.object.isRequired,
    salesFilter: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static contextTypes = {
    store: PropTypes.object
  }

  handleSearchSubmit(form) {
    const { dispatch, session } = this.props;
    dispatch(OrderActions.setSalesSearch(form.search, form.dateFrom, form.dateTo));
    const { salesFilter } = this.context.store.getState();
    dispatch(OrderActions.listBySeller(session.data.auth.token, salesFilter.search || '', salesFilter.filter, salesFilter.dateFrom, salesFilter.dateTo, -1, -1));
  }

  handleFilterClick(filter) {
    const { dispatch, session } = this.props;
    dispatch(OrderActions.setSalesFilter(filter));
    const { salesFilter } = this.context.store.getState();
    dispatch(OrderActions.listBySeller(session.data.auth.token, salesFilter.search || '', salesFilter.filter, salesFilter.dateFrom, salesFilter.dateTo, -1, -1));
  }

  static fetchData(store) {
    const { session } = store.getState();
    if (reFetch(store) && session.data && session.data.auth) {
      return store.dispatch(OrderActions.listBySeller(session.data.auth.token, '', '', undefined, undefined, -1, -1));
    }
  }

  render() {
    const { listOrder, salesFilter } = this.props;
    const handleSearchSubmit = this.handleSearchSubmit.bind(this);
    const handleFilterClick = this.handleFilterClick.bind(this);

    return (
      <div>
        <h1>Sales</h1>
        <SearchAndDateForm onSubmit={handleSearchSubmit} />
        <SalesFilter onClick={handleFilterClick} value={salesFilter.filter || ''} />
        {listOrder.data.orders && listOrder.data.orders.map((order, i)=>{
          return (<SalesList key={i} order={order} />);
        })}
      </div>
    );
  }
}

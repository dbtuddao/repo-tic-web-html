import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { SearchForm, Filter, Order } from '../components';
import { reFetch } from 'redux/modules/app';
import * as OrderActions from 'redux/modules/order';

@connect(
  state => ({
    listOrder: state.orderListUser,
    purchaseFilter: state.purchaseFilter,
    session: state.session
  })
)
export default class History extends React.Component {
  static propTypes = {
    listOrder: PropTypes.object.isRequired,
    purchaseFilter: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static contextTypes = {
    store: PropTypes.object
  }

  handleSearchSubmit(form) {
    const { dispatch, session } = this.props;
    dispatch(OrderActions.setSearch(form.search));
    const { purchaseFilter } = this.context.store.getState();
    dispatch(OrderActions.listByUser(session.data.auth.token, purchaseFilter.search || '', purchaseFilter.filter, -1, -1));
  }

  handleFilterClick(filter) {
    const { dispatch, session } = this.props;
    dispatch(OrderActions.setFilter(filter));
    const { purchaseFilter } = this.context.store.getState();
    dispatch(OrderActions.listByUser(session.data.auth.token, purchaseFilter.search || '', purchaseFilter.filter, -1, -1));
  }

  static fetchData(store) {
    const { session } = store.getState();
    if (reFetch(store) && session.data && session.data.auth) {
      return store.dispatch(OrderActions.listByUser(session.data.auth.token, '', '', -1, -1));
    }
  }

  render() {
    const { listOrder, purchaseFilter } = this.props;
    const handleSearchSubmit = this.handleSearchSubmit.bind(this);
    const handleFilterClick = this.handleFilterClick.bind(this);

    return (
      <div>
        <h1>Purchase</h1>

        <SearchForm onSubmit={handleSearchSubmit} />
        <Filter onClick={handleFilterClick} value={purchaseFilter.filter || ''} />
        {listOrder.data.orders && listOrder.data.orders.map((order, i)=>{
          return (<Order key={i} order={order} />);
        })}
      </div>
    );
  }
}

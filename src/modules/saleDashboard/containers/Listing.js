import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { SearchForm, ListingFilter, ListingList } from '../components';
import { reFetch } from 'redux/modules/app';
import * as AdvertiseActions from 'redux/modules/advertise';

@connect(
  state => ({
    listAd: state.advertiseListAllByUser,
    advertiseFilter: state.advertiseFilter,
    session: state.session
  })
)
export default class Listing extends React.Component {
  static propTypes = {
    listAd: PropTypes.object.isRequired,
    advertiseFilter: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  }

  handleSearchSubmit(form) {
    const { dispatch, session } = this.props;
    dispatch(AdvertiseActions.setPurchaseSearch(form.search));
    const { advertiseFilter } = this.context.store.getState();
    dispatch(AdvertiseActions.listByUser(session.data.auth.token, advertiseFilter.search || '', advertiseFilter.filter, -1, -1));
  }

  handleFilterClick(filter) {
    const { dispatch, session } = this.props;
    dispatch(AdvertiseActions.setPurchaseFilter(filter));
    const { advertiseFilter } = this.context.store.getState();
    dispatch(AdvertiseActions.listByUser(session.data.auth.token, advertiseFilter.search || '', advertiseFilter.filter, -1, -1));
  }

  static fetchData(store) {
    const { session } = store.getState();
    if (reFetch(store) && session.data && session.data.auth) {
      return store.dispatch(AdvertiseActions.listByUser(session.data.auth.token, '', '', -1, -1));
    }
  }

  handleRemove(id) {
    const { dispatch, session } = this.props;
    const r = confirm('Please confirm for remove');
    if (r) {
      dispatch(AdvertiseActions.remove(session.data.auth.token, id));
    }
  }

  handleEdit(id) {
    this.context.router.transitionTo(`/dashboard/sell/listing/${id}/edit`);
  }

  render() {
    const { listAd, advertiseFilter } = this.props;
    const handleSearchSubmit = this.handleSearchSubmit.bind(this);
    const handleFilterClick = this.handleFilterClick.bind(this);
    const handleRemove = this.handleRemove.bind(this);
    const handleEdit = this.handleEdit.bind(this);

    return (
      <div>
        <h1>Listing</h1>
        <SearchForm onSubmit={handleSearchSubmit} />
        <ListingFilter onClick={handleFilterClick} value={advertiseFilter.filter || ''} />
        {listAd.data.advertises && listAd.data.advertises.map((ad, i)=>{
          return (<ListingList key={i} advertise={ad} onRemove={handleRemove} onEdit={handleEdit} />);
        })}
      </div>
    );
  }
}

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reFetch } from 'redux/modules/app';
import { VenueList } from '../components';
import * as CityActions from 'redux/modules/city';
import * as VenueActions from 'redux/modules/venue';
import errorRedirect from 'helpers/errorRedirect';

@connect(state => ({
  city: state.city,
  listVenue: state.venueListByCity
}))
export default class VenuesCity extends React.Component {
  static propTypes = {
    city: PropTypes.object.isRequired,
    listVenue: PropTypes.object.isRequired
  }

  static onEnter(store) {
    return (nextState, transition) => {
      const { city } = store.getState();

      if (city.error) {
        errorRedirect(city.error.status, transition);
      }
    };
  }

  static fetchData(store, state) {
    if (reFetch(store)) {
      return store.dispatch(CityActions.getBySlug(state.params.id)).then(() => {
        const { city } = store.getState();

        if (!city.error) {
          return store.dispatch(VenueActions.listByCity(city.data.id, -1, -1));
        }
      });
    }
  }

  render() {
    const { city, listVenue } = this.props;
    return (
      <div className="row">
        <h3>{city.data.name}</h3>
        <h3>Venues</h3>
        <VenueList venues={listVenue.data.venues} total={listVenue.data.total} />
      </div>
    );
  }
}

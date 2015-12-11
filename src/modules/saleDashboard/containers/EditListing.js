import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { EditListingForm } from '../components';
import { ErrorMessage } from 'components';
import { reFetch } from 'redux/modules/app';
import * as AdvertiseActions from 'redux/modules/advertise';
import { initialize } from 'redux-form';

@connect(
  state => ({
    advertise: state.advertise,
    advertiseUpdate: state.advertiseUpdate,
    session: state.session
  })
)
export default class EditListing extends React.Component {
  static propTypes = {
    advertise: PropTypes.object.isRequired,
    advertiseUpdate: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  }

  static fetchData(store, state) {
    if (reFetch(store)) {
      return store.dispatch(AdvertiseActions.get(state.params.id)).then(() => {
        const { advertise } = store.getState();
        const initVal = {};
        initVal.price = advertise.data.sellPrice;
        initVal.description = advertise.data.description;
        initVal.originalPrice = advertise.data.originalPrice;
        advertise.data.tickets.forEach((ticket) => {
          if (ticket.orderID === '') {
            initVal[ticket.id] = ticket.sale;
          }
        });

        return store.dispatch(initialize('editListing', initVal));
      });
    }
  }

  handleSubmit(form) {
    const { dispatch, session } = this.props;
    const { router, store } = this.context;
    const id = router.state.params.id;

    const data = {price: form.price, description: form.description, tickets: []};
    for (const i in form) {
      if (i !== 'price' && i !== 'description' && i !== 'originalPrice') {
        data.tickets.push({
          id: i,
          sale: form[i]
        });
      }
    }

    console.log(data);

    dispatch(AdvertiseActions.update(session.data.auth.token, id, data)).then(() => {
      const { advertiseUpdate } = store.getState();
      if (!advertiseUpdate.error) {
        router.transitionTo('/dashboard/sell/listing');
      }
    });
  }

  render() {
    const { advertise, advertiseUpdate } = this.props;
    const handleSubmit = this.handleSubmit.bind(this);

    return (
      <div>
        <h1>Edit Listing</h1>
        <ErrorMessage error={advertiseUpdate.error} />
        <EditListingForm
          advertise={advertise.data}
          onSubmit={handleSubmit}
        />
      </div>
    );
  }
}

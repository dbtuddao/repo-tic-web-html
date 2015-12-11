import {reducer as formReducer} from 'redux-form';

const NEW_SELLTICKET_WIZARD = 'tix/sellTicket/NEW_WIZARD';

export default formReducer.plugin({
  sellTicket: (state, action) => {
    switch (action.type) {
      case NEW_SELLTICKET_WIZARD:
        return {};
      default:
        return state;
    }
  }
});

import { combineReducers } from 'redux';

import app from './app';
import auth from './auth';
import event from './event';
import session from './session';
import category from './category';
import search from './search';
import advertise from './advertise';
import wishList from './wishList';
import ticketType from './ticketType';
import ticket from './ticket';
import cart from './cart';
import order from './order';
import venue from './venue';
import city from './city';
import sellTicket from './sellTicket';
import form from './form';
import user from './user';
import facebook from './facebook';
import payment from './payment';
import paymentMethod from './paymentMethod';
import userAddress from './userAddress';

export default combineReducers({
  app,
  ...auth,
  ...category,
  ...event,
  ...session,
  ...search,
  ...advertise,
  ...wishList,
  ...ticketType,
  ...ticket,
  ...cart,
  ...order,
  ...venue,
  ...city,
  ...sellTicket,
  ...user,
  ...facebook,
  ...payment,
  ...paymentMethod,
  ...userAddress,
  form
});

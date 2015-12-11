import React from 'react';
import {Route} from 'react-router';
import * as App from 'modules/app/containers';
import * as Layout from 'modules/layout/containers';
import * as Home from 'modules/home/containers';
import * as Event from 'modules/event/containers';
import * as Category from 'modules/category/containers';
import * as SellTicket from 'modules/sellTicket/containers';
import * as Search from 'modules/search/containers';
import * as City from 'modules/city/containers';
import * as Venue from 'modules/venue/containers';
import * as Ticket from 'modules/ticket/containers';
import * as Checkout from 'modules/checkout/containers';
import * as Error from 'modules/error/containers';
import * as WantToBuyDashboard from 'modules/wantToBuyDashboard/containers';
import * as PurchaseDashboard from 'modules/purchaseDashboard/containers';
import * as SaleDashboard from 'modules/saleDashboard/containers';
import * as SettingDashboard from 'modules/settingDashboard/containers';
import * as Verify from 'modules/verify/containers';

// <Route path="/dashboard/wishlist/search" component={SellTicket.Confirm} />
// <Route component={Layout.Dashboard} onEnter={Layout.Dashboard.onEnter(store)}></Route>

export default function(store) {
  return (
    <Route component={App.App}>
      <Route component={Layout.Main}>
        <Route path="/" component={Home.Home}/>

        <Route path="/search" component={Search.List} />

        <Route path="/ticket/:id" component={Ticket.Ticket} onEnter={Ticket.Ticket.WrappedComponent.onEnter(store)} />

        <Route path="/event/today" component={Event.MoreEventsRangeDate} />
        <Route path="/event/tomorrow" component={Event.MoreEventsRangeDate} />
        <Route path="/event/thisweekend" component={Event.MoreEventsRangeDate} />
        <Route path="/event/thisweek" component={Event.MoreEventsRangeDate} />
        <Route path="/event/:id" component={Event.Event} onEnter={Event.Event.WrappedComponent.onEnter(store)} />
        <Route path="/event/:id/want" component={Event.RequestTicket} />
        <Route path="/want/:id" component={Event.UserWishTicket} onEnter={Event.UserWishTicket.WrappedComponent.onEnter(store)} />

        <Route path="/category/:id/events" component={Category.Category} onEnter={Category.Category.WrappedComponent.onEnter(store)} />

        <Route path="/city/:id/venues" component={City.VenuesCity} onEnter={City.VenuesCity.WrappedComponent.onEnter(store)} />

        <Route path="/venue/:id/events" component={Venue.EventsVenue} onEnter={Venue.EventsVenue.WrappedComponent.onEnter(store)} />

        <Route path="/sell/ticket" component={SellTicket.Home} />
        <Route component={SellTicket.Layout} onEnter={SellTicket.Layout.WrappedComponent.onEnter(store)}>
          <Route path="/sell/ticket/event" component={SellTicket.SelectEvent} />
          <Route path="/sell/ticket/upload" component={SellTicket.Upload} />
          <Route path="/sell/ticket/ticket" component={SellTicket.Ticket} />
          <Route path="/sell/ticket/personal" component={SellTicket.Personal} />
          <Route path="/sell/ticket/promotion" component={SellTicket.Promotion} />
          <Route path="/sell/ticket/confirm" component={SellTicket.Confirm} />
        </Route>

        <Route component={Layout.Dashboard} onEnter={Layout.Dashboard.onEnter(store)}>
          <Route path="/dashboard/wishlist/search" component={WantToBuyDashboard.Search} />
          <Route path="/dashboard/wishlist" component={WantToBuyDashboard.WishList} />
          <Route path="/dashboard/purchase" component={PurchaseDashboard.History} />
          <Route path="/dashboard/sell/listing" component={SaleDashboard.Listing} />
          <Route path="/dashboard/sell/listing/:id/edit" component={SaleDashboard.EditListing} />
          <Route path="/dashboard/sell/sales" component={SaleDashboard.Sales} />
          <Route path="/dashboard/sell/payment" component={SaleDashboard.Payment} />
          <Route path="/dashboard/setting/account" component={SettingDashboard.Account} />
          <Route path="/dashboard/setting/account/edit" component={SettingDashboard.EditAccount} />
          <Route path="/dashboard/setting/payment" component={SettingDashboard.PaymentMethod} />
          <Route path="/dashboard/setting/address" component={SettingDashboard.Address} />
          <Route path="/dashboard/setting/address/create" component={SettingDashboard.AddressCreate} />
          <Route path="/dashboard/setting/address/edit/:id" component={SettingDashboard.AddressUpdate} />
        </Route>

        <Route component={Layout.Verify}>
          <Route path="/verify/email/:token" component={Verify.Email} />
        </Route>

        <Route path="/checkout" component={Checkout.Checkout} onEnter={Checkout.Checkout.WrappedComponent.onEnter(store)} />

        <Route path="/agreement/seller" component={App.SellerAgreement} />
        <Route path="/agreement/buyer" component={App.BuyerAgreement} />
      </Route>
      <Route path="/404" component={Error.NotFound}/>
      <Route path="*" component={Error.NotFound}/>
    </Route>
  );
}

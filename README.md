Tix-Web
==================

## Install Local Machine
- Install gulp in global npm `npm install -g gulp`
- Install dependencies `npm install`
- Run `gulp` for build and watch in dev mode
- Run `gulp build --release` for build compressed version for production
- Run `gulp --release` for build and watch compressed version for production
- Run `npm run start` for run only node express (for runing on staging/production)

## Folder Structure
```
- src
  - actions //flux action
  - components //reusable react components
  - constants //define action type
  - containers //group of section or page
  - public //assets folder
  - reducers //store any app state of react
  - redux //middleware for redux
  - templates //index templates
  - utils //utilities
    - TixApi //api client
  app.js //client side react
  appRouter.js //react router
  server.js //server side react
  routes.js //list all routes in app
  config.js //app config
```

## How to implement Tix-Web

1. Warp promise for client-api in `TixApi/swagger.js`
2. Create an action types for api in `constants/ActionTypes.js`
3. Create an actions to work with api in `actions`
4. Create store state in `reducer` with each action types
5. Create react page
6. Create react components

## Server render with some of data from webservice
In react components create static function cal `fetchData`, This function will work with client side and server side.
It will run when router is trigger or changed

```
static fetchData(store, state) {
  const { ticket } = store.getState();
  if (!ticket.loaded) {
    return store.dispatch(TicketActions.getTicketByID(state.params.id));
  }
}
```
The first param is redux store which we can dispatch our action. Second is state of react router, you can read query and path of url.
Every `fetchData()` should check `loaded` for prevent client side duplicate fetch when server is already fetched.

For multiple fetch we can use `Promise.all()` in `fetchData()`

```
static fetchData(store, state) {
  const promises = [];
  const { event, availableTickets, soldTickets, waitingBids } = store.getState();

  if (!event.loaded) {
    promises.push(store.dispatch(EventActions.getEventByID(state.params.id)));
  }
  if (!availableTickets.loaded) {
    promises.push(store.dispatch(TicketActions.getAvailableTicketsByEventID(state.params.id, 10, 0)));
  }
  if (!soldTickets.loaded) {
    promises.push(store.dispatch(TicketActions.getSoldTicketsByEventID(state.params.id, 10, 0)));
  }
  if (!waitingBids.loaded) {
    promises.push(store.dispatch(BidActions.getWaitingBidsByEventID(state.params.id, 10, 0)));
  }

  return Promise.all(promises);
}
```

Note: You can see the source code on broweser that has `window.APP_INIT_STATE` this is the state of reducer that server send to client for continue working.

## Redirect with React Router

We can redirect on `componentWillReceiveProps` and can get React Router from `contextTypes`

```
static contextTypes = {
  router: PropTypes.object.isRequired
};

componentWillReceiveProps(nextProps) {
  if (!this.props.user && nextProps.user) {
    // login
    this.context.router.transitionTo('/loginSuccess');
  } else if (this.props.user && !nextProps.user) {
    // logout
    this.context.router.transitionTo('/');
  }
}
```

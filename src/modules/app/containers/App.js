import React, { PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import {createTransitionHook} from 'helpers/universalRouter';
import config from 'config';
// import * as SessionActions from 'redux/modules/session';

const title = 'Tix';
const description = 'tix.';
const image = 'https://react-redux.herokuapp.com/logo.jpg';

const meta = {
  title,
  description,
  meta: {
    charSet: 'utf-8',
    property: {
      'og:site_name': title,
      'og:image': image,
      'og:locale': 'en_US',
      'og:title': title,
      'og:description': description,
      'twitter:card': 'summary',
      'twitter:site': '@erikras',
      'twitter:creator': '@erikras',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
      'twitter:image:width': '200',
      'twitter:image:height': '200'
    }
  }
};

export default class App extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  componentWillMount() {
    const {router, store} = this.context;
    this.transitionHook = createTransitionHook(store);
    router.addTransitionHook(this.transitionHook);
    this.fbInit();
  }

  componentWillUnmount() {
    const {router} = this.context;
    router.removeTransitionHook(this.transitionHook);
  }

  fbInit() {
    if (__CLIENT__) {
      window.fbAsyncInit = () => {
        FB.init({
          appId: config.fbAppID,
          xfbml: true,
          cookie: true,
          version: 'v2.4'
        });
      };

      ((d, s, id) => {
        let js = d.getElementsByTagName(s)[0];
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }
  }

  // static fetchData(store) {
  //   const { session } = store.getState();
  //   if (!session.loaded) {
  //     return store.dispatch(SessionActions.get());
  //   }
  // }

  render() {
    const { children } = this.props;
    return (
      <div>
        <DocumentMeta {...meta}/>
        {children}
      </div>
    );
  }
}

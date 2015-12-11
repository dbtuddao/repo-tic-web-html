import React, { PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import {createTransitionHook} from 'helpers/universalRouter';
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
  }

  componentWillUnmount() {
    const {router} = this.context;
    router.removeTransitionHook(this.transitionHook);
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

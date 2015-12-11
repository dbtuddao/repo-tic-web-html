import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect(state => ({
  session: state.session
}))
export default class SessionState extends Component {
  render() {
    console.log('SessionState render: %o', this.props);

    // TODO: Facebook button.
    // TODO: Profile image / menu.
    // TODO: Logout button.
  }
}

import React, { PropTypes } from 'react';
// import { Link } from 'react-router';

export default class NoResult extends React.Component {
  static propTypes = {
    query: PropTypes.string
  }

  render() {
    const { query } = this.props;

    return (
      <div className="row">
        <div className="event-list-search center-block  col-xs-12">
          <h1 className="sell-h1">No results found</h1>
          <p>Oh no, we couldn&#39;t find any results for &#39;{query}&#39;.</p>
          <div className="space--xl"></div>
        </div>
      </div>
    );
  }
}

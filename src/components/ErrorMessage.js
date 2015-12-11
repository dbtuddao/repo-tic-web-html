import React, { PropTypes } from 'react';

export default class ErrorMessage extends React.Component {
  static propTypes = {
    error: PropTypes.object
  }

  render() {
    const { error } = this.props;
    if (!error) {
      return null;
    }

    return (
      <div className="alert alert-danger alert-dismissable" role="alert">
        <strong>ERROR</strong> {error.message}
      </div>
    );
  }
}

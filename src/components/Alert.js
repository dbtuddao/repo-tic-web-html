import React, { PropTypes } from 'react';

class Alert extends React.Component {
  static propTypes = {
    message: PropTypes.string,
    color: PropTypes.string.isRequired
  }

  static defaultProps = {
    message: '',
    color: 'info'
  }

  render() {
    const color = 'alert alert-' + this.props.color;
    if (!this.props.message) {
      return (<div></div>);
    }

    return (
      <div className={color} role="alert">{this.props.message}</div>
    );
  }
}

export default Alert;

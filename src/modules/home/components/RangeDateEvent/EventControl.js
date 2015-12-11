import React, { PropTypes } from 'react';

export default class EventControl extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    eventType: PropTypes.string.isRequired
  }

  onSelect(type) {
    this.setState({currentSelect: type});
    if (this.props.onChange) {
      this.props.onChange(type);
    }
  }

  isActive(type) {
    if (this.props.eventType === type) {
      return 'pointer active';
    }

    return 'pointer';
  }

  render() {
    return (
      <div className="upcoming-nav">
        <ul>
          <li className="col-xs-3"><a className={::this.isActive('today')} onClick={::this.onSelect.bind(this, 'today')}>Today</a></li>
          <li className="col-xs-3"><a className={::this.isActive('tomorrow')} onClick={::this.onSelect.bind(this, 'tomorrow')}>Tomorrow</a></li>
          <li className="col-xs-3"><a className={::this.isActive('thisweekend')} onClick={::this.onSelect.bind(this, 'thisweekend')}>This Weekend</a></li>
          <li className="col-xs-3"><a className={::this.isActive('thisweek')} onClick={::this.onSelect.bind(this, 'thisweek')}>This Week</a></li>
        </ul>
        <div className="clear"></div>
      </div>
    );
  }
}

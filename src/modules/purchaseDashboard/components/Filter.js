import React, { PropTypes } from 'react';

export default class Filter extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    value: PropTypes.string
  }

  static defaultProps = {
    value: ''
  }

  handleClick(filter) {
    this.props.onClick(filter);
  }

  active(filter) {
    return this.props.value === filter ? 'active' : '';
  }

  render() {
    const active = this.active.bind(this);
    const handleAllClick = this.handleClick.bind(this, '');
    const handleUpcommingClick = this.handleClick.bind(this, 'upcomming');
    const handlePastClick = this.handleClick.bind(this, 'past');

    return (
      <div>
        <ul>
          <li className={active('')}><a href="javascript:;" onClick={handleAllClick}>All Events</a></li>
          <li className={active('upcomming')}><a href="javascript:;" onClick={handleUpcommingClick}>Upcomming Events</a></li>
          <li className={active('past')}><a href="javascript:;" onClick={handlePastClick}>Past Events</a></li>
        </ul>
      </div>
    );
  }
}

import React, { PropTypes } from 'react';

export default class ListingFilter extends React.Component {
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
    const handleUpcommingClick = this.handleClick.bind(this, 'active');
    const handlePastClick = this.handleClick.bind(this, 'expired');

    return (
      <div>
        <ul>
          <li className={active('')}><a href="javascript:;" onClick={handleAllClick}>All Events</a></li>
          <li className={active('active')}><a href="javascript:;" onClick={handleUpcommingClick}>Active Events</a></li>
          <li className={active('expired')}><a href="javascript:;" onClick={handlePastClick}>Expired Events</a></li>
        </ul>
      </div>
    );
  }
}

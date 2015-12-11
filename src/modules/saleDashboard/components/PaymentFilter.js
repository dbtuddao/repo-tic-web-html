import React, { PropTypes } from 'react';

export default class PaymentFilter extends React.Component {
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
    const handleCompletedClick = this.handleClick.bind(this, 'completed');
    const handlePendingClick = this.handleClick.bind(this, 'pending');

    return (
      <div>
        <ul>
          <li className={active('')}><a href="javascript:;" onClick={handleAllClick}>All Payments</a></li>
          <li className={active('')}><a href="javascript:;" onClick={handleCompletedClick}>Completed</a></li>
          <li className={active('')}><a href="javascript:;" onClick={handlePendingClick}>Pending</a></li>
        </ul>
      </div>
    );
  }
}

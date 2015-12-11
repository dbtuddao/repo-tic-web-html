import React, { PropTypes } from 'react';

export default class SalesFilter extends React.Component {
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
    const handleRecentClick = this.handleClick.bind(this, 'recent');

    return (
      <div>
        <ul>
          <li className={active('')}><a href="javascript:;" onClick={handleAllClick}>All Events</a></li>
          <li className={active('active')}><a href="javascript:;" onClick={handleRecentClick}>Recent Sales</a></li>
        </ul>
      </div>
    );
  }
}

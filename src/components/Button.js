import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';

const iconLoading = {
  animation: 'fa-spin 2s infinite linear'
};

export default class Button extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    loading: PropTypes.bool,
    to: PropTypes.string,
    type: PropTypes.string,
    color: PropTypes.string,
    rounded: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
    size: PropTypes.string
  }

  render() {
    const { onClick, loading, to, type, children, color, rounded, text, size } = this.props;

    const defailtOnClick = () => {};

    const btnClassName = classNames('btn', 'btn-minw', color ? `btn-${color}` : 'btn-default', rounded ? 'btn-rounded' : '', size ? `btn-${size}` : '');

    if (to) {
      return (
        <Link onClick={onClick || defailtOnClick} className={btnClassName} to={to}>
          {children}
          {text}
        </Link>
      );
    }

    if (loading) {
      return (
        <button className={btnClassName} type="button" disabled="disabled">
          <i style={iconLoading} className="si si-settings"/>
        </button>
      );
    }

    return (
      <button onClick={onClick || defailtOnClick} className={btnClassName} type={type || 'button'}>
        {children}
        {text}
      </button>
    );
  }
}

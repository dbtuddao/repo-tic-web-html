import React, { PropTypes } from 'react';

const loadingWraper = {
  position: 'relative'
};

const loadingBlock = {
  display: 'block',
  position: 'absolute',
  width: '100%',
  height: '100%',
  zIndex: '10',
  opacity: 0.5,
  backgroundColor: '#ffffff'
};

const iconLoading = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  margin: '-20px 0 0 -20px',
  width: '40px',
  height: '40px',
  lineHeight: '40px',
  color: '#646464',
  fontSize: '18px',
  textAlign: 'center',
  zIndex: '12',
  animation: 'fa-spin 2s infinite linear'
};

export default class Loading extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    loading: PropTypes.any
  }

  render() {
    const { loading, children } = this.props;
    if (loading) {
      return (
        <div style={loadingWraper}>
          <div style={loadingBlock}></div>
          <i style={iconLoading} className="si si-settings fa-2x"/>
          {children}
        </div>
      );
    }

    return (<div>{children}</div>);
  }
}

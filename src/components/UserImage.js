import React, { PropTypes } from 'react';

export default class UserImage extends React.Component {
  static propTypes = {
    fbID: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    width: PropTypes.string,
    height: PropTypes.string
  }

  static defaultProps = {
    width: '50',
    height: '50'
  }

  render() {
    const { fbID, name, width, height } = this.props;
    return (
       <img src={`https://graph.facebook.com/${fbID}/picture?redirect=true&width=${width}&height=${height}`} width={width} height={height} title={name} alt={name}/>
    );
  }
}

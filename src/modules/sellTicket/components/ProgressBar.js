import React, { PropTypes } from 'react';

export default class ProgressBar extends React.Component {
  static propTypes = {
    progress: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired
  }

  render() {
    const { name, progress } = this.props;
    const style = {
      width: progress.percent + '%'
    };

    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="progress">
            <div className="progress-bar" role="progressbar" aria-valuenow={progress.percent} aria-valuemin="0" aria-valuemax="100" style={style}>
              { progress.percent === 100 ? `${name}: Processing...` : `${name}: ${Math.round(progress.percent)}%`}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

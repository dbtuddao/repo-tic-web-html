import React from 'react';

class AsSeenOn extends React.Component {
  render() {
    return (
      <div className="sponser container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h2 className="block-title">As Seen on </h2>
              <ul>
                <li><a href="#"><img src="/images/spons1.png" width="97" height="45" alt="sponser"/></a></li>
                <li><a href="#"><img src="/images/spons2.png" width="106" height="45" alt="sponser"/></a></li>
                <li><a href="#"><img src="/images/spons3.png" width="50" height="45" alt="sponser"/></a></li>
                <li><a href="#"><img src="/images/spons4.png" width="56" height="45" alt="sponser"/></a></li>
                <li><a href="#"><img src="/images/spons5.png" width="113" height="45" alt="sponser"/></a></li>
                <li><a href="#"><img src="/images/spons6.png" width="59" height="45" alt="sponser"/></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AsSeenOn;

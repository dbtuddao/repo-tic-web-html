import React from 'react';

class PeopleSay extends React.Component {
  render() {
    return (
       <div className="other-users container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h2 className="block-title">What other users say about us!!</h2>
              <ul>
                <li className="col-xs-4">
                  <img src="/images/user.jpg" width="84" height="85" alt="user"/>
                  <div className="con">
                    <h4>Anna</h4>
                    <p>loremipsum oremipsumboremipsumb oremipsumb</p>
                  </div>
                </li>
                <li className="col-xs-4">
                  <img src="/images/user.jpg" width="84" height="85" alt="user"/>
                  <div className="con">
                    <h4>Anna</h4>
                    <p>loremipsum oremipsumboremipsumb oremipsumb</p>
                  </div>
                </li>
                <li className="col-xs-4">
                  <img src="/images/user.jpg" width="84" height="85" alt="user"/>
                  <div className="con">
                    <h4>Anna</h4>
                    <p>loremipsum oremipsumboremipsumb oremipsumb</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PeopleSay;

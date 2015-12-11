import React from 'react';

class ShortFeature extends React.Component {
  render() {
    return (
      <div className="user-icon user-icon-bg container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="col-xs-12">
                <ul>
                  <li className="col-xs-4">
                    <img src="/images/clock-icon.png" width="65" height="65" alt="icon"/>
                    <h4>Lorem ipsum</h4>
                    <p>loremipsum oremipsumboremipsumb oremipsumb</p>
                  </li>
                  <li className="col-xs-4">
                    <img src="/images/lock-icon.png" width="65" height="65" alt="icon"/>
                    <h4>Lorem ipsum</h4>
                    <p>loremipsum oremipsumboremipsumb oremipsumb</p>
                  </li>
                  <li className="col-xs-4">
                    <img src="/images/globe-icon.png" width="65" height="65" alt="icon"/>
                    <h4>Lorem ipsum</h4>
                    <p>loremipsum oremipsumboremipsumb oremipsumb</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShortFeature;

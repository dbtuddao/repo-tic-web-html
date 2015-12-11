import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
       <div className="footer">
        <div className="social-icons container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <h2 className="block-title-grey">Keep in touch</h2>
                <ul>
                  <li><a href="#"><img src="/images/facebok-icon.png" width="63" height="63" alt="facebok"/></a></li>
                  <li><a href="#"><img src="/images/twitter-icon.png" width="63" height="63" alt="facebok"/></a></li>
                  <li><a href="#"><img src="/images/google-icon.png" width="63" height="63" alt="facebok"/></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="partners container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 text-center">
                <h2 className="block-title-grey">Partners</h2>
                <ul>
                  <li><a href="#"><img src="/images/partners1.png" width="90" height="70" alt="partners"/></a></li>
                  <li><a href="#"><img src="/images/partners2.png" width="175" height="48" alt="partners"/></a><a href="#"><img src="/images/partners3.png" width="175" height="48" alt="partners"/></a></li>
                  <li><a href="#"><img src="/images/partners1.png" width="90" height="70" alt="partners"/></a></li>
                  <li><a href="#"><img src="/images/partners4.png" width="168" height="48" alt="partners"/></a><a href="#"><img src="/images/partners5.png" width="168" height="48" alt="partners"/></a></li>
                  <li><a href="#"><img src="/images/partners1.png" width="90" height="70" alt="partners"/></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bggrey container-fluid">
          <div className="container">
            <div className="row">
              <div className="footer-links  col-xs-12">
                <ul>
                  <li><h3>Head</h3></li>
                  <li><a href="#">- Home</a></li>
                  <li><a href="#">- Event</a></li>
                  <li><a href="#">- Search</a></li>
                  <li><a href="#">- About us</a></li>
                  <li><a href="#">- Testemonials</a></li>
                  <li><a href="#">- Jobs</a></li>
                </ul>
                <ul>
                  <li><h3>Head</h3></li>
                  <li><a href="#">- How to buy</a></li>
                  <li><a href="#">- How to Sell</a></li>
                  <li><a href="#">- Faq</a></li>
                  <li><a href="#">- Costs</a></li>
                </ul>
                <ul>
                  <li><h3>Head</h3></li>
                  <li><a href="#">- User Agreements</a></li>
                  <li><a href="#">- Privacy Policy</a></li>
                  <li><a href="#">- Cookie Policy</a></li>
                </ul>
                <ul>
                  <li><h3>Head</h3></li>
                  <li><a href="#">- Facebook</a></li>
                  <li><a href="#">- Twitter</a></li>
                </ul>
                <ul>
                  <li><h3>Head</h3></li>
                  <li><a href="#">- Lorem</a></li>
                  <li><a href="#">- Lorem</a></li>
                  <li><a href="#">- Lorem</a></li>
                  <li><a href="#">- Lorem</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

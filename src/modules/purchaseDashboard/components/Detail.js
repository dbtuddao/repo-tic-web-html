import React, { PropTypes } from 'react';


export default class Detail extends React.Component {
  static propTypes = {
    ticket: PropTypes.object.isRequired
  }

  render() {
    const { ticket } = this.props;

    return (
      <div className="col-md-4">
        <div>
          <a href={`/_api/img/ticket/${ticket.bundle}/${ticket.id}.png`}>
            <img src={`/_api/img/ticket/${ticket.bundle}/${ticket.id}_thumb.png`} />
          </a>
        </div>
        <div>
          <a href={`/Download/PdfTicket/${ticket.id}`} target="_blank">Download Ticket</a>
        </div>
      </div>
    );
  }
}

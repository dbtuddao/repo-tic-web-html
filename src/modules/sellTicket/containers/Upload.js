import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import { Uploader, ListPDF, ProgressBar } from '../components';
import { ErrorMessage } from 'components';
import * as SellTicketActions from 'redux/modules/sellTicket';
import * as SessionActions from 'redux/modules/session';

@connect(
  state => ({
    sellTicket: state.sellTicket,
    mostSoldEventList: state.eventListMostSold,
    ticketTypeList: state.ticketTypeListAllByEvent,
    session: state.session
  })
)
export default class Upload extends React.Component {
  static propTypes = {
    sellTicket: PropTypes.object.isRequired,
    mostSoldEventList: PropTypes.object.isRequired,
    ticketTypeList: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  }

  handleUpload(ref, file) {
    const { dispatch, session } = this.props;
    // dispatch upload
    dispatch(SellTicketActions.uploadFile(session.data.auth.token, file, ref, (p) => {
      // trigger progress
      dispatch(SellTicketActions.updateProgress(p, ref, file.name));
    })).then(() => {
      const { sellTicket } = this.context.store.getState();
      if (!sellTicket.uploadError) {
        return dispatch(SessionActions.save('sellTicket', sellTicket.data));
      }
    }).then(() => {
      dispatch(SellTicketActions.deleteProgress(ref));
    });
  }

  handleChangeEntrance(ref, pdf, val) {
    this.props.dispatch(SellTicketActions.changeTicetEntrance(ref, pdf.id, val));
  }

  handleChangeSale(ref, pdf, val) {
    this.props.dispatch(SellTicketActions.changeTicketSale(ref, pdf.id, val));
  }

  handleDeleteTicket(ref) {
    this.props.dispatch(SellTicketActions.deleteTickets(ref));
  }

  handleNextStep() {
    const { dispatch } = this.props;
    const { router } = this.context;
    const { sellTicket } = this.props;
    return dispatch(SessionActions.save('sellTicket', sellTicket.data)).then(() => {
      router.transitionTo(`/sell/ticket/ticket`);
    });
  }

  render() {
    const { sellTicket } = this.props;
    const handleUpload = this.handleUpload.bind(this);
    const handleChangeEntrance = this.handleChangeEntrance.bind(this);
    const handleChangeSale = this.handleChangeSale.bind(this);
    const handleDeleteTicket = this.handleDeleteTicket.bind(this);
    const handleNextStep = this.handleNextStep.bind(this);
    const pdfs = [];
    if (sellTicket.data.upload) {
      for (const key in sellTicket.data.upload) {
        if (sellTicket.data.upload.hasOwnProperty(key)) {
          pdfs.push(
            <ListPDF
              key={key}
              pdfs={sellTicket.data.upload[key].uploads}
              name={sellTicket.data.upload[key].name}
              reference={key}
              onChangeEntrance={handleChangeEntrance}
              onChangeSale={handleChangeSale}
              onDelete={handleDeleteTicket}
            />
          );
        }
      }
    }

    const progresses = [];
    if (sellTicket.uploadProgress) {
      for (const key in sellTicket.uploadProgress) {
        if (sellTicket.uploadProgress.hasOwnProperty(key)) {
          progresses.push(<ProgressBar key={key} progress={sellTicket.uploadProgress[key].progress} name={sellTicket.uploadProgress[key].name} />);
        }
      }
    }

    return (
      <div className="row">
        <div className="col-xs-12">
          <h2>{sellTicket.data.event.name}</h2>
          <p>from {moment(sellTicket.data.event.fromDate).format('ll')}, {sellTicket.data.event.venue.name}, {sellTicket.data.event.venue.city.name}</p>
          <Link to="/sell/ticket/event" className="change-event pointer">Change event</Link>
        </div>
        <div className="col-xs-12">
          <ErrorMessage error={sellTicket.uploadError} />
        </div>
        <div className="col-xs-12">
          <Uploader onUpload={handleUpload} />
        </div>
        <div className="col-xs-12">
          {progresses}
        </div>
        <div className="col-xs-12">
          {pdfs}
        </div>
        <div className="col-xs-12">
          <Link to="/sell/ticket/event" className="btn btn-default">Back</Link>
          <button onClick={handleNextStep} className="btn btn-default" disabled={!pdfs.length}>Next</button>
        </div>
      </div>
    );
  }
}

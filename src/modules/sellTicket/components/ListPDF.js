import React, { PropTypes } from 'react';
import Select from 'react-select';

export default class ListPDF extends React.Component {
  static propTypes = {
    pdfs: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    reference: PropTypes.string.isRequired,
    onChangeEntrance: PropTypes.func.isRequired,
    onChangeSale: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  }

  handleChangeEntrance(ref, pdf, val) {
    this.props.onChangeEntrance(ref, pdf, val === 'entrance' ? true : false);
  }

  handleChangeSale(ref, pdf, val) {
    this.props.onChangeSale(ref, pdf, val === 'sale' ? true : false);
  }

  handleDelete(ref) {
    this.props.onDelete(ref);
  }

  entranceOptions = [
    { value: 'entrance', label: 'Entrance' },
    { value: 'attachment', label: 'Attachment' }
  ];

  saleOptions = [
    { value: 'sale', label: 'Sale' },
    { value: 'not_sale', label: 'Not Sale' }
  ]

  listPDF(pdf, i) {
    const { reference } = this.props;
    const handleChangeEntrance = this.handleChangeEntrance.bind(this, reference, pdf);
    const handleChangeSale = this.handleChangeSale.bind(this, reference, pdf);

    return (
      <div key={i} className="media">
        <div className="media-left media-middle">
          <a href={`/_api/img/ticket/${pdf.bundle}/${pdf.id}.png`} target="_blank">
            <img src={`/_api/img/ticket/${pdf.bundle}/${pdf.id}_thumb.png`} width="200" />
          </a>
        </div>
        <div className="media-body">
          <h4 className="media-heading">Page {i + 1}</h4>
          { pdf.codes !== '' && (
            <div>
              <p>{pdf.codes}</p>
              <div style={{display: 'none'}}>
              <Select value={pdf.entrance ? 'entrance' : 'attachment'} options={this.entranceOptions} onChange={handleChangeEntrance} searchable={false} clearable={false} />
              </div>
              <div>
                <Select value={pdf.sale ? 'sale' : 'not_sale'} options={this.saleOptions} onChange={handleChangeSale} searchable={false} clearable={false} />
              </div>
            </div>
          )}
          { pdf.codes === '' && (
            <div></div>
          )}
        </div>
      </div>
    );
  }

  render() {
    const { name, pdfs, reference } = this.props;
    const handleDelete = this.handleDelete.bind(this, reference);
    const listPDF = this.listPDF.bind(this);
    return (
      <div className="row">
        <div className="col-xs-12">
          <h3>{name}</h3>
          <a href="javascript:;" onClick={handleDelete}>Remove all</a>
        </div>
        <div className="col-xs-12">
          {pdfs && pdfs.map(listPDF)}
        </div>
      </div>
    );
  }
}

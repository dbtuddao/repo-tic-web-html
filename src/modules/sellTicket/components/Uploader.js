import React, { PropTypes, Component } from 'react';
import Dropzone from 'react-dropzone';

export default class Uploader extends Component {
  static propTypes = {
    onUpload: PropTypes.func.isRequired
  }

  handleDrop(files) {
    files.forEach(file => {
      const ref = Math.random() * 1000000 + '';
      this.props.onUpload(ref, file);
    });
  }

  handleOpen() {
    this.refs.dropzone.open();
  }

  render() {
    const onDrop = this.handleDrop.bind(this);

    return (
      <div>
        <Dropzone className="uploadticket pointer" ref="dropzone" onDrop={onDrop}>
          <div className="logo"> <img src="/images/pdf-logo.png" alt="pdf"/> </div>
          <div className="uploadticket-head ">Drop PDF file here </div>
          <p> or Browse file here </p>
        </Dropzone>
      </div>
    );
  }
}

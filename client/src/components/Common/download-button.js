import React from 'react';

export default class DownloadButton extends React.Component {
  props: {
  fileLoad: any,
  export: string,
  removeFile: any,
  fileId: string
}
  constructor(props) {
    super(props);
    this.onDownload = this.onDownload.bind(this);
  }
  onDownload() {

    window.location.href = `/api/files/upload/${this.props.fileLoad}`;

    if (this.props.export === 'hidden') {
      this.props.removeFile(this.props.fileId);
    }

  }

  render() {
    return (
      <button type="button" className="btn btn-info btn-xs" onClick={this.onDownload}>
        <span className="glyphicon glyphicon-circle-arrow-down"></span>
        Download
      </button>
    );
  }
}

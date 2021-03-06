//SYNC 12/03/2017 DP
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FileTable from '../../components/Files/file-table';
import FileZone from '../../components/Files/file-zone';

/* actions */
import { getFiles, addFile, bookoutFile, deleteFile, removeFile } from '../../actions/actions_files';
import { setFiletabCount } from '../../actions/actions_main';
import { createLog } from '../../actions/actions_changes'; //Not Synced

class FileList extends Component {
  props: {
    addFile: any,
    bookoutFile: any,
    createLog: any,
    deleteFile: any,
    exportFiles: string,
    files: any,
    filesTab: string,
    getFiles: any,
    removeFile: any,
    setFiletabCount: any,
    sourceId: string,
    user: any
  }
  constructor(props) {
    super(props);
    this.state = {};
    this.onAddFile = this.onAddFile.bind(this);
    this.onCreateLog = this.onCreateLog.bind(this);
    this.onBookoutFile = this.onBookoutFile.bind(this);
    this.onDeleteFile = this.onDeleteFile.bind(this);
    this.onRemoveFile = this.onRemoveFile.bind(this);
  }

  componentWillMount() {
    if (this.props.sourceId) {
      this.props.getFiles(this.props.sourceId);
    }
  }

  componentDidUpdate() {
    this.props.setFiletabCount(this.props.files.length);
  }

  onAddFile(file) {
    this.props.addFile(file);
  }

  onCreateLog(log) {
    this.props.createLog(log);
  }

  onDeleteFile(id) {
    this.props.deleteFile(id);
  }

  onRemoveFile(id) {
    this.props.removeFile(id);
  }

  onBookoutFile(id, user) {
    this.props.bookoutFile(id, user);
  }

  render() {
    const tableStyle = {
      marginTop: 20,
      marginLeft: 10
    };

    return (
      <div className={this.props.filesTab}>
        <div className="row">
          <div style={tableStyle} className="col-sm-10">
            <FileTable
              files={this.props.files}
              user={this.props.user}
              exportFiles={this.props.exportFiles}
              createLog={this.onCreateLog}
              deleteFile={this.onDeleteFile}
              removeFile={this.onRemoveFile}
              bookoutFile={this.onBookoutFile} />
          </div>
          <div className={this.props.exportFiles}>
            <div className="col-sm-1">
              <FileZone
                addFile={this.onAddFile}
                user={this.props.user}
                sourceId={this.props.sourceId} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({ files: state.files, user: state.main.user }),
  {
    getFiles,
    addFile,
    bookoutFile,
    deleteFile,
    removeFile,
    setFiletabCount,
    createLog
  })(FileList);

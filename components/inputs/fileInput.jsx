import React, {Component, PropTypes} from 'react';
import {Col, Glyphicon} from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';

import ContractActions from 'contractActions';
import validator from 'validator';

class FileInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      extraClassName: '',
      hasChanges: false,
    };
    this.onDropAccepted = this.onDropAccepted.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.previousFile && this.props.previousFile !== nextProps.file) {
      this.setState({hasChanges: true});
    } else {
      this.setState({hasChanges: false});
    }
  }

  onDropAccepted(files) {
    ContractActions.addTermOfReference(files[0]);
    ReactTooltip.hide();
    this.setState({extraClassName: 'fileDropSuccess'});
  }

  render() {
    let groupClassNames = 'form-group form-group-sm has-feedback';
    const labelClassNames = classNames('col-sm-4 control-label', {required: this.props.required});
    const label = this.props.label ?
      <label htmlFor={this.props.id} className={labelClassNames}><span>{this.props.label}</span></label> :
      null;
    let dataType = null;
    let dataTip = null;
    if (this.state.hasChanges) {
      groupClassNames += ' has-changes';
      dataType = 'info';
      dataTip = `Previous file: <strong>${this.props.previousFile}</strong>`;
    }
    if (this.props.required && this.props.applyValidation) {
      const validationResult = validator.validateField(this.props.id, this.props.file);
      if (!validationResult.valid) {
        groupClassNames += ' has-error';
        dataType = 'error';
        dataTip = validationResult.validationMessage;
      }
    }
    const downloadLink = this.props.downloadFileUrl ?
      <a href={this.props.downloadFileUrl}><Glyphicon glyph="download-alt" /></a> :
      null;

    return (
      <div>
        <ReactTooltip id={this.props.id} html />
        <div className={groupClassNames}>
          {label}
          <Col
            sm={7}
            className="fileDropZone"
            data-for={this.props.id}
            data-tip={dataTip}
            data-type={dataType}
            data-effect="solid"
          >
            <Dropzone
              className={classNames('fileDrop', this.state.extraClassName, {readonly: this.props.readOnly})}
              activeClassName="fileDropActive"
              rejectClassName="fileDropActive"
              accept="application/pdf"
              multiple={false}
              onDropAccepted={!this.props.readOnly ? this.onDropAccepted : null}
              disableClick={this.props.readOnly}
              disablePreview
            >
              {this.props.file ?
                <span>
                  Selected file: <strong>{this.props.file}</strong>
                </span> :
                <span>Drag and drop or click to select the <strong>Terms of reference</strong></span>
              }
            </Dropzone>
            {downloadLink}
          </Col>
        </div>
      </div>
    );
  }
}

FileInput.propTypes = {
  id: PropTypes.string.isRequired,
  file: PropTypes.string,
  previousFile: PropTypes.string,
  downloadFileUrl: PropTypes.string,
  label: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  applyValidation: PropTypes.bool,
};

export default FileInput;

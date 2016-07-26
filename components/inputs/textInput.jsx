import React, {Component, PropTypes} from 'react';
import {Col, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';
import Validator from 'validation/validator';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: true,
      hasChanges: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Once the validation has been enabled through the component we don't need
    // to hear for a possible validation from a form level
    let result = null;
    if (nextProps.applyValidation || this.props.value !== nextProps.value) {
      result = Validator.validateField(this.props.id, nextProps.value ? nextProps.value : '');
      if (result.valid && !this.state.hasChanges) {
        ReactTooltip.hide();
      }
    }
    let modifiedFromPreviousValue = null;
    if (this.props.previousValue && this.props.previousValue.toString() !== nextProps.value.toString()) {
      modifiedFromPreviousValue = {hasChanges: true};
    } else {
      modifiedFromPreviousValue = {hasChanges: false};
    }
    if (result || modifiedFromPreviousValue) {
      this.setState(_.assign({}, result, modifiedFromPreviousValue));
    }
  }

  handleChange(e) {
    // This is a workaround only for IE because it triggers the onChange event when we click on the field
    // for the first time and as there is no input shows a validtion error which is not the desired behaviour
    if (!this.props.value && !e.target.value) {
      return;
    }
    this.props.onChange(e.target.value);
  }

  handleBlur() {
    const validationResult = Validator.validateField(this.props.id, this.props.value ? this.props.value : '');
    if (!validationResult.valid) {
      this.setState(validationResult);
    }
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  render() {
    let dataType = null;
    let dataTip = null;
    if (this.state.hasChanges) {
      dataType = 'info';
      dataTip = `Previous value: <strong>${this.props.previousValue}</strong>`;
    }
    if (!this.state.valid) {
      dataType = 'error';
      dataTip = this.state.validationMessage;
    }
    return (
      <FormGroup
        controlId={this.props.id}
        bsSize="sm"
        className={this.state.valid && this.state.hasChanges ? 'has-changes' : ''}
        validationState={this.state.valid ? null : 'error'}
      >
        <ReactTooltip id={this.props.id} html />
        <ControlLabel className={classNames('col-sm-4', {required: this.props.required})}>
          {this.props.label}
        </ControlLabel>
        <Col sm={this.props.inputWidth ? this.props.inputWidth : 6}>
          <FormControl
            type="text"
            value={this.props.value}
            onChange={this.handleChange}
            onFocus={this.props.onFocus}
            onBlur={this.handleBlur}
            placeholder={this.props.placeholder}
            readOnly={this.props.readOnly}
            data-for={this.props.id}
            data-tip={dataTip}
            data-type={dataType}
            data-effect="solid"
          />
          {this.props.hint && <span className="form-control-feedback input-hint">({this.props.hint})</span>}
          <FormControl.Feedback />
          {this.state.hasChanges && this.state.valid &&
            <span className="form-control-feedback glyphicon glyphicon-info-sign" />
          }
        </Col>
      </FormGroup>
    );
  }
}

TextInput.propTypes = {
  id: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  previousValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  applyValidation: PropTypes.bool,
  inputWidth: PropTypes.number,
  hint: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default TextInput;

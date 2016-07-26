import React, {Component, PropTypes} from 'react';
import {Col} from 'react-bootstrap';
import {SimpleSelect} from 'react-selectize';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';
import _ from 'lodash';

import validator from 'validator';

class SelectInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applyValidation: false,
      hasChanges: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // Once the validation has triggered through the component we don't need
    // to hear for a possible validation from a form level
    if (!this.state.applyValidation) {
      this.setState({applyValidation: nextProps.applyValidation});
    }
    let modifiedFromPreviousValue = null;
    if (this.props.previousValue && this.props.previousValue !== nextProps.value) {
      modifiedFromPreviousValue = {hasChanges: true};
    } else {
      modifiedFromPreviousValue = {hasChanges: false};
    }
    if (modifiedFromPreviousValue) {
      this.setState(modifiedFromPreviousValue);
    }
  }

  handleChange(selectedObject, callback) {
    ReactTooltip.hide();
    let value = null;
    if (selectedObject) {
      value = selectedObject.value;
    }
    this.props.onChange(value);
    // the callback is passed to this method by react-selectize component
    // and we have to call it in order to reset the component state
    // https://github.com/furqanZafar/react-selectize#gotchas
    callback();
  }

  handleBlur() {
    this.setState({applyValidation: true});
  }

  render() {
    let groupClassNames = 'form-group form-group-sm has-feedback';
    let validationIcon = null;
    let dataType = null;
    let dataTip = null;
    if (this.state.hasChanges) {
      groupClassNames += ' has-changes';
      validationIcon = <span className="form-control-feedback glyphicon glyphicon-info-sign" />;
      dataType = 'info';
      dataTip = `Previous value: <strong>${this.props.previousValue}</strong>`;
    }
    if (this.props.required && this.state.applyValidation) {
      const validationResult = validator.validateField(this.props.id, this.props.value);
      if (!validationResult.valid) {
        groupClassNames += ' has-error';
        validationIcon = <span className="form-control-feedback glyphicon glyphicon-remove" />;
        dataType = 'error';
        dataTip = validationResult.validationMessage;
      }
    }
    const labelClassNames = classNames('col-sm-4 control-label', {required: this.props.required});
    const label = this.props.label ?
      <label htmlFor={this.props.id} className={labelClassNames}><span>{this.props.label}</span></label> :
      null;
    const value = _.find(this.props.options, {value: this.props.value});
    return (
      <div className={groupClassNames}>
        <ReactTooltip id={this.props.id} html />
        {label}
        <Col
          sm={label ? 6 : 12}
          data-for={this.props.id}
          data-tip={dataTip}
          data-type={dataType}
          data-effect="solid"
        >
          <SimpleSelect
            options={this.props.options}
            value={value}
            placeholder={this.props.placeholder}
            onValueChange={this.handleChange}
            onBlur={this.handleBlur}
            disabled={this.props.readOnly}
            tether
          />
          {validationIcon}
        </Col>
      </div>
    );
  }
}

SelectInput.propTypes = {
  id: PropTypes.string,
  options: PropTypes.array.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  previousValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  applyValidation: PropTypes.bool,
};

export default SelectInput;

import React, {Component, PropTypes} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';

import Validator from 'validation/validator';
import {DATE_FORMAT} from 'contractTemplateConstants';

class DateInput extends Component {
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

  handleChange(date) {
    if (date && !this.props.readOnly) {
      this.props.onChange(date.format(DATE_FORMAT));
    }
  }

  handleBlur() {
    this.setState({applyValidation: true});
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  render() {
    const value = this.props.value ? moment(this.props.value, DATE_FORMAT) : null;
    const labelClassNames = classNames('control-label col-sm-4', {required: this.props.required});
    const label = this.props.label ?
      <label htmlFor={this.props.id} className={labelClassNames}><span>{this.props.label}</span></label> :
      null;
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
      const validationResult = Validator.validateField(this.props.id, this.props.value);
      if (!validationResult.valid) {
        groupClassNames += ' has-error';
        validationIcon = <span className="form-control-feedback glyphicon glyphicon-remove" />;
        dataType = 'error';
        dataTip = validationResult.validationMessage;
      }
    }
    return (
      <div className={groupClassNames}>
        <ReactTooltip id={this.props.id} html />
        {label}
        <div
          className={this.props.wrapperClassName ? this.props.wrapperClassName : 'col-sm-4'}
          data-for={this.props.id}
          data-tip={dataTip}
          data-type={dataType}
          data-effect="solid"
        >
          <DatePicker
            id={this.props.id}
            placeholderText={this.props.placeholder}
            className={this.props.className ? this.props.className : 'form-control'}
            dateFormat={DATE_FORMAT}
            selected={value}
            minDate={this.props.minDate}
            maxDate={this.props.maxDate}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.props.onFocus}
            readOnly={this.props.readOnly}
          />
          {validationIcon}
        </div>
      </div>
    );
  }
}

DateInput.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  previousValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  wrapperClassName: PropTypes.string,
  className: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  applyValidation: PropTypes.bool,
};

export default DateInput;

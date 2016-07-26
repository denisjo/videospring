import React, {Component, PropTypes} from 'react';
import {Col} from 'react-bootstrap';

import ContractActions from 'contractActions';
import ItemConstants from 'constants/itemConstants';
import TextInput from 'inputs/textInput';
import CheckboxInput from 'checkboxInput';
import DateInput from 'inputs/dateInput';
import TextArea from 'inputs/textArea';
import TextInputWithSuggestions from 'inputs/textInputWithSuggestions';

class FormItem extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleChange(args) {
    if (args.target) {
      ContractActions.updateDocument(this.props.item.id, args.target.value);
    } else {
      ContractActions.updateDocument(this.props.item.id, args);
    }
  }

  handleCheckboxChange(e) {
    ContractActions.updateDocument(this.props.item.id, e.target.checked);
  }

  render() {
    const {item, value, previousValue, applyValidation, hint} = this.props;
    let result;
    switch (item.type) {
      case ItemConstants.INPUT_TEXT:
        result = (
          <TextInput
            id={item.id}
            value={value}
            previousValue={previousValue}
            onChange={this.handleChange}
            onFocus={() => ContractActions.specOptionFocus(this.props.item.id)}
            onBlur={() => ContractActions.specOptionBlur(this.props.item.id)}
            label={item.label}
            placeholder={item.placeholder}
            wrapperClassName="col-sm-6"
            labelClassName="col-sm-4 required"
            readOnly={this.props.readOnly}
            applyValidation={applyValidation}
            hint={hint}
            required
            emitChangeOnModified
          />
        );
        break;
      case ItemConstants.CHECKBOX:
        result = (
          <CheckboxInput
            id={item.id}
            checked={value}
            onChange={this.handleCheckboxChange}
            onFocus={() => ContractActions.specOptionFocus(this.props.item.id)}
            label={item.label}
            wrapperClassName="col-xs-offset-4 col-xs-8"
          />
        );
        break;
      case ItemConstants.INPUT_DATE:
        result = (
          <DateInput
            id={item.id}
            value={value}
            minDate={this.props.valueRange && this.props.valueRange.minDate}
            maxDate={this.props.valueRange && this.props.valueRange.maxDate}
            previousValue={previousValue}
            onChange={this.handleChange}
            onFocus={() => ContractActions.specOptionFocus(this.props.item.id)}
            onBlur={() => ContractActions.specOptionBlur(this.props.item.id)}
            label={item.label}
            placeholder={item.placeHolder}
            wrapperClassName="col-sm-6"
            readOnly={this.props.readOnly}
            applyValidation={applyValidation}
            required
          />
        );
        break;
      case ItemConstants.INPUT_TEXT_WITH_SUGGESTIONS:
        result = (
          <div className="form-group form-group-sm">
            <label htmlFor={item.id} className="control-label col-sm-4">{item.label}</label>
            <Col md={6}>
              <TextInputWithSuggestions
                id={item.id}
                value={value}
                onChange={this.handleChange}
                onFocus={() => ContractActions.specOptionFocus(this.props.item.id)}
                options={item.options}
                placeholder={item.placeholder}
                inputClassNames="form-control"
              />
            </Col>
          </div>
        );
        break;
      case ItemConstants.ANNEX2:
        result = (
          <TextArea
            id={item.id}
            value={value}
            previousValue={previousValue}
            onChange={this.handleChange}
            onFocus={() => ContractActions.specOptionFocus(this.props.item.id)}
            onBlur={() => ContractActions.specOptionBlur(this.props.item.id)}
            label={item.label}
            placeholder={item.placeholder}
            wrapperClassName="col-sm-6"
            labelClassName="col-sm-4 required"
            readOnly={this.props.readOnly}
            applyValidation={applyValidation}
            required
            emitChangeOnModified
          />
        );
        break;
      default:
        result = null;
    }
    return (
      result
    );
  }
}

FormItem.propTypes = {
  item: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  previousValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  valueRange: PropTypes.object,
  applyValidation: PropTypes.bool,
  readOnly: PropTypes.bool,
  hint: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default FormItem;

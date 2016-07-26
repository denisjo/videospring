import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';

import ContractStore from 'stores/contractStore';
import ContractActions from 'contractActions';
import SpecificOptionChecker from 'services/specificOptionsChecker';
import Scroller from 'scroller';
import ItemConstants from 'constants/itemConstants';
import TextItem from 'textItem';
import {DATE_FORMAT} from 'contractTemplateConstants';
import TextInputWithSuggestions from 'inputs/textInputWithSuggestions';
import Annex2Table from './annex2Table';

class ContractContentItem extends Component {
  constructor(props) {
    super(props);

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidUpdate() {
    if (this.props.isActive) {
      const container = document.getElementById('contractContentArea');
      const inputEl = ReactDOM.findDOMNode(this);
      Scroller.scrollTo(container, inputEl.offsetTop, 400);
    }
  }

  handleTextChange(e) {
    if (!this.props.readOnly) {
      ContractActions.updateDocument(this.props.id, e.target.value);
    }
  }

  handleCheckboxChange(e) {
    if (!this.props.readOnly) {
      ContractActions.updateDocument(this.props.id, e.target.checked);
    }
  }

  handleDateChange(date) {
    if (!this.props.readOnly) {
      ContractActions.updateDocument(this.props.id, date.format(DATE_FORMAT));
    }
  }

  render() {
    let result;

    switch (this.props.type) {
      case ItemConstants.TEXT:
        result = <TextItem text={this.props.text} style={this.props.style} />;
        break;
      case ItemConstants.INPUT_TEXT:
        result = (
          <input
            id={this.props.id}
            type="text"
            className={classNames('textInput', {specOptionActive: this.props.isActive})}
            placeholder={this.props.label}
            value={this.props.value}
            onChange={this.handleTextChange}
            readOnly={this.props.readOnly}
            disabled={!SpecificOptionChecker.isOptionEnabled(this.props.id)}
          />
        );
        break;
      case ItemConstants.CHECKBOX:
        result = (
          <input
            type="checkbox"
            id={this.props.id}
            data-original-title={this.props.placeholder}
            checked={this.props.value}
            onChange={this.handleCheckboxChange}
            className={classNames({specOptionActive: this.props.isActive})}
            data-placement="right"
            readOnly={this.props.readOnly}
            disabled={!SpecificOptionChecker.isOptionEnabled(this.props.id)}
          />
        );
        break;
      case ItemConstants.INPUT_DATE: {
        const {datesRules} = ContractStore.getState();
        result = (
          <div className="contractContentInputItem">
            <DatePicker
              id={this.props.id}
              selected={this.props.value ? moment(this.props.value, DATE_FORMAT) : null}
              minDate={datesRules[this.props.id] && datesRules[this.props.id].minDate}
              maxDate={datesRules[this.props.id] && datesRules[this.props.id].maxDate}
              placeholderText={this.props.label}
              className={classNames('dateTimePicker', {specOptionActive: this.props.isActive})}
              dateFormat={DATE_FORMAT}
              onChange={this.handleDateChange}
              readOnly={this.props.readOnly}
              disabled={!SpecificOptionChecker.isOptionEnabled(this.props.id)}
            />
          </div>
        );
        break;
      }
      case ItemConstants.ANNEX2:
        result = (
          <Annex2Table
            id={this.props.id}
            value={this.props.value}
            isActive={this.props.isActive}
          />
        );
        break;
      case ItemConstants.INPUT_TEXT_WITH_SUGGESTIONS:
        result = (
          <div className="contractContentInputItem">
            <TextInputWithSuggestions
              id={this.props.id}
              onChange={val => ContractActions.updateDocument(this.props.id, val)}
              options={this.props.options}
              value={this.props.value}
              placeholder={this.props.placeholder}
              inputClassNames={classNames({specOptionActive: this.props.isActive})}
            />
          </div>
        );
        break;
      default:
        result = null;
    }
    return result;
  }
}

ContractContentItem.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  style: PropTypes.object,
  text: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  readOnly: PropTypes.bool,
};

export default ContractContentItem;

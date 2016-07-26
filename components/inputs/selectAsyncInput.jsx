import React, {Component, PropTypes} from 'react';
import {Col} from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import classNames from 'classnames';
import {SimpleSelect} from 'react-selectize';
import _ from 'lodash';

import validator from 'validator';

class SelectAsyncInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applyValidation: false,
      options: [],
      search: '',
    };

    this.fetchData = _.debounce(search => {
      this.props.loadOptions(search)
      .then(response => {
        this.setState({options: response}, () => {
          this.refs.select.highlightFirstSelectableOption();
        });
      });
    }, 400);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    // When the component is rendered and a value is present we need to fetch
    // the whole object from the server in order to show the label and not the value
    if (this.props.value) {
      this.props.loadOptions(this.props.value)
      .then(response => {
        this.setState({options: response});
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    // Once the validation has triggered through the component we don't need
    // to hear for a possible validation from a form level
    if (!this.state.applyValidation) {
      this.setState({applyValidation: nextProps.applyValidation});
    }
  }

  handleSearchChange(search, callback) {
    this.setState({search}, callback);
    // We prohibit making request until the user enters three characters
    // to reduce the amount of requests
    if (search.length < 3) {
      return;
    }
    this.fetchData(search);
  }

  handleChange(selectedObject, callback) {
    ReactTooltip.hide();
    let value = null;
    if (selectedObject) {
      value = selectedObject.value;
    }
    this.props.onChange(value);
    callback();
  }

  handleBlur() {
    this.setState({applyValidation: true});
  }

  render() {
    let groupClassNames = 'form-group form-group-sm has-feedback';
    let validationIcon = null;
    let tooltipMessage = null;
    if (this.props.required && this.state.applyValidation) {
      const validationResult = validator.validateField(this.props.id, this.props.value);
      if (!validationResult.valid) {
        groupClassNames += ' has-error';
        validationIcon = <span className="glyphicon glyphicon-remove form-control-feedback" />;
        tooltipMessage = validationResult.validationMessage;
      }
    }
    const labelClassNames = classNames(`col-sm-${this.props.width} control-label`, {required: this.props.required});
    const label = this.props.label ?
      <label htmlFor={this.props.id} className={labelClassNames}><span>{this.props.label}</span></label> :
      null;
    let value = null;
    if (this.props.value) {
      value = _.find(this.state.options, {value: this.props.value});
      // There is a case that the previously selected value is not longer available
      // so in that case we need to show at least the selected value as label too
      if (!value) {
        value = {
          label: this.props.value,
          value: this.props.value,
        };
      }
    }
    return (
      <div className={groupClassNames}>
        <ReactTooltip id={this.props.id} />
        {label}
        <Col
          sm={this.props.width}
          data-for={this.props.id}
          data-tip={tooltipMessage}
          data-type="error"
          data-effect="solid"
        >
          <SimpleSelect
            ref="select"
            options={this.state.options}
            search={this.state.search}
            value={value}
            placeholder={this.props.placeholder}
            onSearchChange={this.handleSearchChange}
            onValueChange={this.handleChange}
            onBlur={this.handleBlur}
            tether
          />
          {validationIcon}
        </Col>
      </div>
    );
  }
}

SelectAsyncInput.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  loadOptions: PropTypes.func.isRequired,
  label: PropTypes.string,
  width: PropTypes.number,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  applyValidation: PropTypes.bool,
};

export default SelectAsyncInput;

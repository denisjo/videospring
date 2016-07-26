import React, {PropTypes} from 'react';
import {Input} from 'react-bootstrap';

const CheckboxInput = props => (
  <Input
    type="checkbox"
    checked={props.checked}
    onChange={props.onChange}
    onFocus={props.onFocus}
    onBlur={props.onBlur}
    label={props.label}
    wrapperClassName={props.wrapperClassName}
  />
);

CheckboxInput.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  label: PropTypes.string,
  wrapperClassName: PropTypes.string,
};

export default CheckboxInput;

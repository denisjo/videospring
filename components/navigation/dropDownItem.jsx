import React, {PropTypes} from 'react';

const DropDownItem = props => (
  <div id={props.id} className="dropdown-item">
    <span className="dropdown-item-title">{props.title}</span>
    <small>{props.subtitle}</small>
  </div>
);

DropDownItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default DropDownItem;

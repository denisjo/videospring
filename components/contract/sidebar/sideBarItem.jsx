import React, {PropTypes} from 'react';

const SideBarItem = ({label, content}) => (
 content ? (<p><span>{label} <strong>{content}</strong></span></p>) : <span />
);

SideBarItem.propTypes = {
  label: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default SideBarItem;

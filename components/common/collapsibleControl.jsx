import React, {PropTypes} from 'react';
import {Glyphicon} from 'react-bootstrap';

const CollapsibleControl = ({isExpanded}) => (
  <Glyphicon glyph={isExpanded ? 'triangle-bottom' : 'triangle-right'} />
);

CollapsibleControl.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
};

export default CollapsibleControl;

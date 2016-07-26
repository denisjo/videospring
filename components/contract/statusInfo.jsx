import React, {PropTypes} from 'react';
import {Glyphicon} from 'react-bootstrap';

import okIcon from 'images/ok_icon.png';
import warnIcon from 'images/warn_icon.png';

const StatusInfo = props => (
  <span className={props.classNames}>Status: {props.isValid ?
    <span>complete <img src={okIcon} alt="valid section" /></span> :
    <span>warning <img src={warnIcon} alt="invalid section" /></span>}
    {props.hasChanges && <Glyphicon glyph="info-sign" />}
  </span>
);

StatusInfo.propTypes = {
  isValid: PropTypes.bool.isRequired,
  hasChanges: PropTypes.bool,
  classNames: PropTypes.string,
};

export default StatusInfo;

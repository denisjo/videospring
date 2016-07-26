import React, {PropTypes} from 'react';

import SideBarItem from './sideBarItem';
import {EMI_MANAGE_POOL} from 'configConstants';

const PoolInfo = (props) => {
  const participationType = props.participation ?
    <SideBarItem label="Participation Type:" content={props.participation} /> :
    null;
  const contractingParty = props.contractingParty ?
    <SideBarItem label="Contracting Party:" content={props.contractingParty} /> :
    null;
  return (
    <div>
      <h4><span>Pool Info</span></h4>
      <p>
        <span>Pool Code: <strong>
          <a id="poolCode" href={`${EMI_MANAGE_POOL}?action=update&poolCode=${props.code}&poolTab=tpc`}>{props.code}</a>
        </strong></span>
      </p>
      <SideBarItem label="Framework Program:" content={props.frameworkProgram} />
      <SideBarItem label="Process Type:" content={props.processType} />
      {participationType}
      {contractingParty}
    </div>
  );
};

PoolInfo.propTypes = {
  code: PropTypes.string.isRequired,
  frameworkProgram: PropTypes.string.isRequired,
  processType: PropTypes.string.isRequired,
  participation: PropTypes.string,
  contractingParty: PropTypes.string,
};

export default PoolInfo;

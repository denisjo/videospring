import React, {PropTypes} from 'react';
import classNames from 'classnames';
import {Glyphicon} from 'react-bootstrap';

import './sideBar.less';

import PoolInfo from './poolInfo';
import SideBarItem from './sideBarItem';
import ContractActions from 'contractActions';

const expandSideBarButton = (
  <div id="sidebarCollapse" onClick={ContractActions.toggleSidebar}>
    <Glyphicon glyph="menu-hamburger" />
    <Glyphicon glyph="triangle-left" />
    <Glyphicon glyph="triangle-left" />
    <Glyphicon glyph="triangle-left" />
  </div>
);

const Sidebar = ({isExpanded, centralWorkingDays, remoteWorkingDays, poolInfo, expertInfo}) => (
  <div id="constractSidebarWrapper" className={classNames({isCollapsed: !isExpanded})}>
    <div id="constractSidebar" key="sidebar">
      <div id="constractSidebarContent">
        <h4><span>Contract Info </span></h4>
        <SideBarItem label="Central Working Days:" content={centralWorkingDays} />
        <SideBarItem label="Remote Working Days:" content={remoteWorkingDays} />

        <PoolInfo {...poolInfo} />

        <h4><span>Expert Info </span></h4>
        <SideBarItem
          label="Name:"
          content={`${expertInfo.firstName} ${expertInfo.familyName}`}
        />
        <SideBarItem label="Candidature Ref:" content={expertInfo.candidatureReference} />
        <SideBarItem label="Email:" content={expertInfo.email} />
        <SideBarItem label="Address:" content={`${expertInfo.streetName} ${expertInfo.streetNumber}`} />
        <SideBarItem label="Postal Code:" content={expertInfo.postCode} />
        <SideBarItem label="Po Box:" content={expertInfo.poBox} />
        <SideBarItem label="City:" content={expertInfo.town} />
        <SideBarItem label="Country:" content={expertInfo.country} />
      </div>
      {expandSideBarButton}
    </div>
  </div>
);

Sidebar.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  centralWorkingDays: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  remoteWorkingDays: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  poolInfo: PropTypes.object.isRequired,
  expertInfo: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    familyName: PropTypes.string.isRequired,
    candidatureReference: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    postCode: PropTypes.string,
    poBox: PropTypes.string,
    town: PropTypes.string,
    country: PropTypes.string,
  }).isRequired,
};

export default Sidebar;

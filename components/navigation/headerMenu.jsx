import React, {PropTypes} from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import DropDownItem from 'dropDownItem';
import logo from 'images/logo.png';

const HeaderMenu = props => (
  <Navbar id="headerNavBar" fluid>
    <NavbarBrand>
      <a href="#"><img alt="EMI" src={logo} /></a>
    </NavbarBrand>
    <Nav pullRight>
      <NavItem id="homeNav" eventKey={1} href="/emi">
        <span>
          Home
        </span>
      </NavItem>
      <NavDropdown id="help-nav-dropdown" eventKey={3} noCaret pullRight title="Help">
        <MenuItem eventKey="1" href="http://www.google.com">
          <DropDownItem id="helpMenuItem" title="Help" subtitle="Open Help" />
        </MenuItem>
        <MenuItem eventKey="2" href="http://www.google.com">
          <DropDownItem id="versionMenuItem" title="Version" subtitle="EMI Version" />
        </MenuItem>
      </NavDropdown>
      <NavDropdown id="profile-nav-dropdown" eventKey={4} noCaret pullRight title={props.fullName}>
        <MenuItem eventKey="1" href="http://www.google.com">
          <DropDownItem
            id="profileMenuItem"
            title={`Profile ${props.username}`}
            subtitle="Change your profile"
          />
        </MenuItem>
        <MenuItem eventKey="2" href="http://www.google.com">
          <DropDownItem id="taskMenuItem" title="Task" subtitle="Go to the task" />
        </MenuItem>
        <MenuItem eventKey="3" href="http://www.google.com">
          <DropDownItem id="logoutMenuItem" title="Logout" subtitle="Your account" />
        </MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar>
);

HeaderMenu.propTypes = {
  username: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
};

export default HeaderMenu;

import React from 'react';
import {Navbar, Nav, NavDropdown, MenuItem} from 'react-bootstrap';

import SubMenu from './subMenu';
import MenuSearch from 'menuSearch';

const MainMenu = () => {
  const contractItems = [{text: 'TEMPLATE', link: 'http://www.google.com'}];
  const uploadItems = [{text: 'CONTRACTS TEMPLAE', link: 'http://www.google.com'}];
  const emppItems = [{text: 'IMPORT', link: 'http://www.google.com'}];
  return (
    <Navbar id="mainMenu" fluid>
      <Nav>
        <NavDropdown id="search-nav-dropdown" title="SEARCH">
          <MenuItem href="http://www.google.com">
            EXPERT
          </MenuItem>
          <MenuItem href="http://www.google.com">
            GROUP
          </MenuItem>
          <MenuItem href="http://www.google.com">
            POOL
          </MenuItem>
          <MenuItem href="http://www.google.com">
            ATTEDANCE SESSION
          </MenuItem>
          <MenuItem href="http://www.google.com">
            COST STATEMENT
          </MenuItem>
          <SubMenu text="CONTRACTS" items={contractItems} />
          <MenuItem href="http://www.google.com">
            PAYMENTS
          </MenuItem>
          <MenuItem href="http://www.google.com">
            COMMS HISTORY
          </MenuItem>
        </NavDropdown>
        <NavDropdown id="search-nav-dropdown" title="CREATE">
          <MenuItem href="http://www.google.com">
            GROUP
          </MenuItem>
          <MenuItem href="http://www.google.com">
            POOL
          </MenuItem>
          <MenuItem href="http://www.google.com">
            EXPERT
          </MenuItem>
        </NavDropdown>
        <NavDropdown id="search-nav-dropdown" title="UTILITIES">
          <SubMenu text="UPLOAD" items={uploadItems} />
          <SubMenu text="EMPP" items={emppItems} />
        </NavDropdown>
      </Nav>
      <Nav pullRight>
        <MenuSearch />
      </Nav>
    </Navbar>
  );
};

export default MainMenu;

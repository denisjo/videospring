/* http://stackoverflow.com/questions/18023493/bootstrap-3-dropdown-sub-menu-missing*/
import React, {PropTypes} from 'react';

import './subMenu.less';

const SubMenu = props => {
  const menuItems = props.items.map((item, index) =>
    <li key={index} className="sub-menu-item">
      <a href={item.link}>{item.text}</a>
    </li>
  );
  return (
    <li className="menu-item dropdown dropdown-submenu">
      <a href="#" className="dropdown-toggle" data-toggle="dropdown">{props.text}</a>
      <ul className="dropdown-menu">
          {menuItems}
      </ul>
    </li>
  );
};

SubMenu.propTypes = {
  text: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default SubMenu;

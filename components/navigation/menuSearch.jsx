import React from 'react';

import searchImage from 'images/search00.png';

export default () => (
  <div id="menuSearch">
    <select defaultValue="attendance">
      <option>Pool</option>
      <option>Group</option>
      <option value="attendance">Attendance Session</option>
      <option>Cost Statement</option>
      <option>Payment Request</option>
      <option>Payment Order</option>
    </select>
    <input type="text" />
    <a href="">
      <img src={searchImage} alt="search" />
    </a>
  </div>
);

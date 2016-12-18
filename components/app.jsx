import React, {PropTypes} from 'react';
import Serie from 'serie';
import MainMenu from 'mainMenu';

const App = ({children}) => (
  <div>
    <MainMenu />
    <h1>List of Series</h1>
    <Serie />
  </div>
);

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]),
};

export default App;

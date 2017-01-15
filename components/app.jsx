import React, {PropTypes} from 'react';
import Series from 'series';
import MainMenu from 'mainMenu';

const App = ({children}) => (
  <div>
    <h1>List of Series</h1>
    <Series />
  </div>
);

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]),
};

export default App;

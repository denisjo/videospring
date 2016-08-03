import React, {PropTypes} from 'react';

const App = ({children}) => (
  <div>
    <h1>Hello world</h1>
  </div>
);

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]),
};

export default App;

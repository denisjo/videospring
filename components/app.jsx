import React, {PropTypes} from 'react';

const App = ({children}) => (
  <div>
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]),
};

export default App;

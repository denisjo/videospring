import React, {PropTypes} from 'react';

import Navbar from 'navbar';
import Footer from 'footer';
import MainMenu from 'mainMenu';

const App = ({children}) => (
  <div className="container">
    <Navbar />
    {children}
    <Footer />
    
  </div>

);

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]),
};

export default App;

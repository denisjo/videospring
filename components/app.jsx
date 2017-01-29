import React, {PropTypes} from 'react';
import Series from 'series';
import MainMenu from 'mainMenu';

const App = ({children}) => (
  <div>
    <section className="banner">
      <h1>JD Labs Library</h1>
      <h4>The first online library that provides your customized video assets</h4>
      <p></p>
    </section>
    <section className="preview">
      <h1>Series</h1>
      <p>Discover our designer quality video elements library for your projects</p>
      <Series />
    </section>
  </div>

);

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]),
};

export default App;

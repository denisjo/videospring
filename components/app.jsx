import React, {PropTypes} from 'react';
import SerieItem from 'serieItem';

const App = ({children}) => (
  <div>
    <h1>List of Series</h1>
    <SerieItem />
    <SerieItem />
    <SerieItem />
  </div>
);

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.array,
  ]),
};

export default App;

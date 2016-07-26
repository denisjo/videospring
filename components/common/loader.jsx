import React, {PropTypes} from 'react';
import ReactLoader from 'react-loader';

const options = {
  lines: 13,
  length: 20,
  width: 10,
  radius: 30,
  corners: 1,
  rotate: 0,
  direction: 1,
  color: '#fff',
  speed: 1,
  trail: 60,
};

const Loader = props => (
  props.loading ?
    <div id="loaderOverlay">
      <ReactLoader key="Loader" options={options} />
      {props.message && <div id="loaderMessageContainer"><div id="loaderMessage">{props.message}</div></div>}
    </div> :
    <span />
);

Loader.propTypes = {
  loading: PropTypes.bool,
  message: PropTypes.string,
};

export default Loader;

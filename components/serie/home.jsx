import React, {Component, PropTypes} from 'react';
import {Grid, Col, Row, Alert, ButtonToolbar} from 'react-bootstrap';
import {Link} from 'react-router';

import Series from 'series';
import _ from 'lodash';

var data = require('./data.json');


class Home extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    
    return (
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
  }
}

/*Serie.propTypes = {
  serieItems: PropTypes.array,
};*/

export default Home;

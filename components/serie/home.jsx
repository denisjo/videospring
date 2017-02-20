import React, {Component, PropTypes} from 'react';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import {Link} from 'react-router';

import Series from 'series';
import _ from 'lodash';

var data = require('./data.json');


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    
    return (
    <div>
        <section className="banner">
            <h1>JD Labs Library</h1>
            <h4>The first online library that provides your customized video assets</h4>
            <br />
            <form>
              <FormGroup controlId="formBasicText" bsSize="large">
                <InputGroup>
                  <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="Enter text"
                    onChange={this.handleChange}
                  />
                  <InputGroup.Addon>
                    <Glyphicon glyph="music" />
                  </InputGroup.Addon>
                </InputGroup>
    
              </FormGroup>
            </form>

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
};


*/

export default Home;

import React, {Component, PropTypes} from 'react';
import SerieItem from 'serieItem';
import {Grid, Col, Row, Alert, ButtonToolbar} from 'react-bootstrap';
import _ from 'lodash';

var data = require('./data.json');


class Serie extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    /*if (!this.props.document) {
      return (
        <div>
          <h2>Empty</h2>
        </div>
      );
    }*/
    const serieItems = [];
    serieItems.push(...data.serie.items.map(item => {
       return (
          <SerieItem previewUrl = {item.previewUrl}/>
       );
    }));
    return (

      <div>
        <h1>{data.serie.name}</h1>
        <Row>
            {serieItems}
        </Row>
      </div>
    );
  }
}

/*Serie.propTypes = {
  serieItems: PropTypes.array,
};*/

export default Serie;

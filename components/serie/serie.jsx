import React, {Component, PropTypes} from 'react';
import SerieComponent from 'serieComponent';
import {Grid, Col, Row, Alert, ButtonToolbar} from 'react-bootstrap';
import _ from 'lodash';

import VideoPreview from 'videoPreview';

var data = require('./data.json');


class Serie extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    const serieId = this.props.params.serieId;    
    const serie = _.find(data.series, {'id':serieId});

    if(_.isNil(serie)) {
      return (
        <div>
          <h2>Serie not found</h2>
        </div>
      );
    }
    const serieItems = [];
    serieItems.push(...serie.components.map(component => {
       return (
          <SerieComponent key={component.id} serie={serie} id={component.id} previewUrl={component.previewUrl}
                      cover={component.videoCover}
                      title={component.title}/>
       );
    }));
    return (

      <div key={serieId}>
        <Row>
          <Col className="col-lg-8 col-md-6 col-xs-12">
            <VideoPreview id={serie.id} cover={serie.videoCover} previewUrl={serie.previewUrl}/>
          </Col>
          <Col className="col-lg-4 col-md-6 col-xs-12">
            <h1>{serie.name}</h1>
          </Col>
        </Row>
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

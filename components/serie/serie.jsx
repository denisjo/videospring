import React, {Component, PropTypes} from 'react';
import SerieComponent from 'serieComponent';
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
    serieItems.push(...data.serie.components.map(component => {
       return (
          <SerieComponent key={component.id} id={component.id} previewUrl={component.previewUrl}
                      cover={component.videoCover}
                      title={component.title}/>
       );
    }));
    return (

      <div key={data.serie.id}>
        <Row>
          <Col className="col-lg-8 col-md-6 col-xs-12">
            <video className="video-js" poster={data.serie.videoCover} preload="auto" controls data-setup="{}">
              <source src={data.serie.previewUrl} type="video/mp4" />
            </video>
          </Col>
          <Col className="col-lg-4 col-md-6 col-xs-12">
            <h1>{data.serie.name}</h1>
          </Col>
        </Row>
        
        {serieItems}
      </div>
    );
  }
}

/*Serie.propTypes = {
  serieItems: PropTypes.array,
};*/

export default Serie;

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
          <SerieItem id={item.id} previewUrl={item.previewUrl}
                      cover={item.videoCover}
                      title={item.title}/>
       );
    }));
    return (

      <div>
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

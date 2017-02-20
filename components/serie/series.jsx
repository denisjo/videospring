import React, {Component, PropTypes} from 'react';
import {Grid, Col, Row, Alert, ButtonToolbar} from 'react-bootstrap';
import {Link} from 'react-router';
import VideoPreview from 'videoPreview';
import _ from 'lodash';

var data = require('./data.json');


class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
        video : [],
        imgVisible : true,
    };
  }

  render() {
    /*if (!this.props.document) {
      return (
        <div>
          <h2>Empty</h2>
        </div>
      );
    }*/
    const series = [];
    
    series.push(...data.seriePreviews.map(serie => {
       return (
           
            <Col className="col-lg-4 col-md-4 col-xs-6 " key={serie.id}>
              <div className="card-preview">
                <Link to={`serie/${serie.id}/${serie.name}/`} >
                  <VideoPreview id={serie.id} cover={serie.videoCover} previewUrl={serie.previewUrl}/>
                </Link>
                <h3>{serie.name}</h3>
              </div>
            </Col>
       );
    }));
    return (

      <div>
        <Row>
            {series}
        </Row>
      </div>
    );
  }
}

/*Serie.propTypes = {
  serieItems: PropTypes.array,
};*/

export default Series;

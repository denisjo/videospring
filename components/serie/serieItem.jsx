import React, {Component, PropTypes} from 'react';
import {Grid, Col, Row, Alert, ButtonToolbar} from 'react-bootstrap';

class SerieItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
      <Col className="col-lg-4 col-md-6 col-xs-12">
        <div className="card">
          <div className="card-header">
          <video controls="controls">
            <source src={this.props.previewUrl} type="video/mp4" />
          </video>
          </div>
          <Row>Light details</Row>
          <div fluid id="contractTitleBar">
            <h4>Contract tool</h4>
            <h3>TODO : Serie Name</h3>
              
          </div>
        </div>
        </Col>
      </div>
    );
  }
}

SerieItem.propTypes = {
  previewUrl: PropTypes.string,
};

export default SerieItem;

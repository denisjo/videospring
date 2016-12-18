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
              <video controls="controls" poster={this.props.videoCover}>
                <source src={this.props.previewUrl} type="video/mp4" />
              </video>
            </div>
            <div className="card-content">
              <h4>{this.props.title}</h4>
            </div>
            <div className="card-footer">
            </div>
          </div>
        </Col>
      </div>
    );
  }
}

SerieItem.propTypes = {
  previewUrl: PropTypes.string,
  title: PropTypes.string,
};

export default SerieItem;

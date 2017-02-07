import React, {Component, PropTypes} from 'react';
import {Grid, Col, Row, Alert, ButtonToolbar} from 'react-bootstrap';
import {Link} from 'react-router';

import VideoPreview from 'videoPreview';

class SerieComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Col className="col-lg-3 col-md-4 col-xs-6">
        <div className="card">
          <div className="card-header">
            <Link to={`/serie/${this.props.serie.id}/${this.props.serie.name}/component/${this.props.id}`} >
              <VideoPreview id={this.props.id} cover={this.props.cover} previewUrl={this.props.previewUrl}/>
            </Link>
          </div>
          <div className="card-content">
            <h4>{this.props.title}</h4>
          </div>
          <div className="card-footer">
          </div>
        </div>
      </Col>
    );
  }
}

SerieComponent.propTypes = {
  id: PropTypes.string,
  previewUrl: PropTypes.string,
  cover: PropTypes.string,
  title: PropTypes.string,
};

export default SerieComponent;

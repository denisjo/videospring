import React, {Component, PropTypes} from 'react';
import {Grid, Col, Row, Alert, ButtonToolbar} from 'react-bootstrap';
import _ from 'lodash';


class SerieItem extends Component {
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

    return (
      <div>
      <Col className="col-md-3">
        <Row>
          <video controls="controls">
            <source src="http://jdlabs.spyweb.be/AfterEffects3DTracking.mp4" type="video/mp4" />
          </video>
        </Row>
        <Row>Light details</Row>
        <div fluid id="contractTitleBar">
          <h4>Contract tool</h4>
          <h3>TODO : put Serie Name</h3>
            
        </div>
        </Col>
      </div>
    );
  }
}

/*SerieItem.propTypes = {
  loading: PropTypes.bool,
  alertMessage: PropTypes.string,
  contractInfo: PropTypes.object,
  previousContractInfo: PropTypes.object,
  datesRules: PropTypes.object,
  document: PropTypes.object,
  specOptionsInfo: PropTypes.array,
  generalOptionsInfo: PropTypes.array,
  view: PropTypes.object,
  applyValidation: PropTypes.bool,
  contractNumber: PropTypes.string,
  isViewMode: PropTypes.bool,
  titleBarInfo: PropTypes.shape({
    label: PropTypes.string.isRequired,
    primaryButtonLabel: PropTypes.string.isRequired,
    primaryButtonCallback: PropTypes.func,
    primaryButtonHref: PropTypes.string,
    secondaryButtonLabel: PropTypes.string.isRequired,
    secondaryButtonHref: PropTypes.string.isRequired,
  }),
};*/

export default SerieItem;

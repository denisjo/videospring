import React, {Component, PropTypes} from 'react';
import {Grid, Col, Row, Alert, ButtonToolbar} from 'react-bootstrap';
import _ from 'lodash';


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

    return (
      <div>
        <Row>
            
        </Row>
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

export default Serie;

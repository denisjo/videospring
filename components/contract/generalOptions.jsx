import React, {Component, PropTypes} from 'react';
import {Row, Col, Modal, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import _ from 'lodash';

import ContractActions from 'contractActions';

class GeneralOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {modalIsVisible: false};
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({modalIsVisible: false});
  }

  render() {
    const generalOptionsRows = _.chunk(this.props.generalOptionsInfo, 2).map((row, index) => {
      const items = row.map(item =>
        <Col key={item.id} md={6}>
          <FormGroup controlId={item.id}>
            <ControlLabel>{item.label}</ControlLabel>
            <FormControl
              componentClass="select"
              value={this.props.specOptions[item.id]}
              onChange={e => !this.props.isViewMode && ContractActions.updateGeneralOption(item.id, e.target.value)}
              readOnly={this.props.isViewMode}
            >
              {item.options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </FormControl>
          </FormGroup>
        </Col>
      );
      return (
        <Row key={index}>
          {items}
        </Row>
      );
    });
    return (
      <div className="pull-right">
        <Button
          bsStyle="link"
          onClick={() => this.setState({modalIsVisible: true})}
        >
          Change general options
        </Button>

        <Modal bsSize="large" show={this.state.modalIsVisible} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Contract general options</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form">
              {generalOptionsRows}
            </div>
          </Modal.Body>
          <Modal.Footer>
            {!this.props.isViewMode &&
              <Button
                bsStyle="primary"
                onClick={() => {
                  ContractActions.updateGeneralOptions();
                  this.closeModal();
                }}
              >
                Ok
              </Button>
            }
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

GeneralOptions.propTypes = {
  generalOptionsInfo: PropTypes.array,
  specOptions: PropTypes.object,
  isViewMode: PropTypes.bool,
};

export default GeneralOptions;

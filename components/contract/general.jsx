import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import {Row, Col} from 'react-bootstrap';

import ContractActions from 'contractActions';
import GeneralOptions from './generalOptions';
import DateInput from 'dateInput';
import TextInput from 'textInput';
import SelectInput from 'selectInput';
import FileInput from 'fileInput';
import FormItem from 'formItem';
import {CONTRACT_BASE} from 'configConstants';
import ContractDatesService from 'services/contractDatesService';
import SpecificOptionChecker from 'services/specificOptionsChecker';

const getSumOfWorkingDays = (centralWorkingDays, remoteWorkingDays) => {
  let result = null;
  const centralNumber = Number(centralWorkingDays);
  if (centralWorkingDays && !isNaN(centralNumber)) {
    result += centralNumber;
  }
  const remoteNumber = Number(remoteWorkingDays);
  if (remoteWorkingDays && !isNaN(remoteNumber)) {
    result += remoteNumber;
  }
  return result;
};

class General extends Component {
  getFormItemHint(itemId) {
    // maxWorkingDays is the id of the corresponding specific option
    if (itemId === 'maxWorkingDays') {
      return getSumOfWorkingDays(this.props.centralWorkingDays, this.props.remoteWorkingDays);
    }
    return ContractDatesService.getMaxDays(this.props.specOptions, itemId);
  }

  propertyExists(propertyName) {
    return typeof this.props[propertyName] === 'undefined';
  }

  hiddenClassHelper(propertyName) {
    return classNames({
      hidden: this.propertyExists(propertyName),
    });
  }

  render() {
    const optionFeeContract = [
      {value: true, label: 'PAID'},
      {value: false, label: 'UNPAID'},
    ];
    const specificOptionsRows = _.chunk(this.props.specOptionsInfo, 2).map((row, index) => {
      const items = row.map(item =>
        <Col key={item.id} md={6}>
          <FormItem
            item={item}
            value={this.props.specOptions[item.id]}
            previousValue={this.props.previousContractInfo && this.props.previousContractInfo.specOptions[item.id]}
            valueRange={this.props.datesRules && this.props.datesRules[item.id]}
            applyValidation={this.props.applyValidation}
            readOnly={this.props.isViewMode || !SpecificOptionChecker.isOptionEnabled(item.id)}
            hint={this.getFormItemHint(item.id)}
          />
        </Col>
      );
      return (
        <Row key={index}>
          {items}
        </Row>
      );
    });
    let contractNumber = null;
    if (this.props.contractNumber) {
      contractNumber = this.props.contractNumber;
    } else if (this.props.originalContractNumber) {
      contractNumber = this.props.originalContractNumber;
    }
    const downloadTorUrl = contractNumber ? `${CONTRACT_BASE}downloadTOR/${contractNumber}` : null;
    return (
      <div id="contractEditorContainer">
        <div>
          <Row className="formSectionTitle">
            <Col md={9}>
              <h5>Quick fill tool</h5>
            </Col>
            <Col md={3}>
              <GeneralOptions
                generalOptionsInfo={this.props.generalOptionsInfo}
                specOptions={this.props.specOptions}
                isViewMode={this.props.isViewMode}
              />
            </Col>
          </Row>
        </div>
        <div id="contractEditor" className="resizable form-horizontal">

          <Row>
            <Col md={6} className={this.hiddenClassHelper('contractTitle')}>
              <TextInput
                id="contractTitle"
                value={this.props.contractTitle}
                previousValue={this.props.previousContractInfo && this.props.previousContractInfo.contractTitle}
                onChange={value => ContractActions.updateContractInfo({contractTitle: value})}
                label="Title"
                placeholder="Contract Title"
                applyValidation={this.props.applyValidation}
                readOnly={this.props.isViewMode}
                required
              />
            </Col>
            <Col md={6} className={this.hiddenClassHelper('contractDescription')}>
              <TextInput
                id="contractDescription"
                value={this.props.contractDescription}
                previousValue={this.props.previousContractInfo && this.props.previousContractInfo.contractDescription}
                onChange={value => ContractActions.updateContractInfo({contractDescription: value})}
                label="Description"
                placeholder="Contract Description"
                applyValidation={this.props.applyValidation}
                readOnly={this.props.isViewMode}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} className={this.hiddenClassHelper('startDate')}>
              <DateInput
                id="startDate"
                value={this.props.startDate}
                previousValue={this.props.previousContractInfo && this.props.previousContractInfo.startDate}
                onChange={value => ContractActions.updateContractInfo({startDate: value})}
                label="Start Date"
                placeholder="Start Date"
                applyValidation={this.props.applyValidation}
                readOnly={this.props.isViewMode}
                required
              />
            </Col>
            <Col md={6} className={this.hiddenClassHelper('isPaid')}>
              <SelectInput
                id="isPaid"
                options={optionFeeContract}
                value={this.props.isPaid}
                previousValue={this.props.previousContractInfo && this.props.previousContractInfo.isPaid}
                onChange={value => ContractActions.updateContractInfo({isPaid: value})}
                label="Fee"
                placeholder="Paid contract fee"
                applyValidation={this.props.applyValidation}
                readOnly={this.props.isViewMode}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} className={this.hiddenClassHelper('termsOfReference')}>
              {this.props.isTermsOfReferenceRequired &&
                <FileInput
                  id="termsOfReference"
                  file={this.props.termsOfReference}
                  previousFile={this.props.previousContractInfo && this.props.previousContractInfo.termsOfReference}
                  downloadFileUrl={downloadTorUrl}
                  label="Terms of Reference"
                  applyValidation={this.props.applyValidation}
                  readOnly={this.props.isViewMode}
                  required
                />
              }
            </Col>
          </Row>
          <hr />
          {specificOptionsRows}
        </div>
      </div>
    );
  }
}

General.propTypes = {
  contractNumber: PropTypes.string,
  originalContractNumber: PropTypes.string,
  contractTitle: PropTypes.string,
  contractDescription: PropTypes.string,
  remoteWorkingDays: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  centralWorkingDays: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  startDate: PropTypes.string,
  isPaid: PropTypes.bool,
  isTermsOfReferenceRequired: PropTypes.bool.isRequired,
  termsOfReference: PropTypes.string,
  previousContractInfo: PropTypes.object,
  specOptions: PropTypes.object,
  specOptionsInfo: PropTypes.array,
  generalOptionsInfo: PropTypes.array,
  datesRules: PropTypes.object,
  view: PropTypes.object,
  applyValidation: PropTypes.bool,
  isViewMode: PropTypes.bool,
};

export default General;

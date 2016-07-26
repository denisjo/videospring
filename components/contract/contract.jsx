import React, {Component, PropTypes} from 'react';
import {Grid, Col, Alert, ButtonToolbar} from 'react-bootstrap';
import Loader from 'loader';
import _ from 'lodash';

import ContractSideBar from './sidebar/contractSideBar';
import General from 'general';
import ContractContent from 'contractContent';
import ResizableButton from 'resizableButton';

import './contract.less';

class Contract extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 142 pixels is the size of the menu
      // and the elements that are always in the screen and don's scroll
      quickFillHeight: ((window.innerHeight - 142) * 0.35),
      quickFillMaxHeight: ((window.innerHeight - 142) * 0.5),
      contractContentMaxHeight: ((window.innerHeight - 142) * 0.60),
      alertVisible: true,
    };
    this.dragPosition = 0;
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragOver = this.handleDragOver.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
  }

  handleDragStart(e) {
    this.dragPosition = e.screenY;
    e.dataTransfer.setData('text', '');
  }

  handleDragOver(e) {
    e.preventDefault();
  }

  handleDragEnd(e) {
    const dif = this.dragPosition - e.screenY;
    const newHeight = this.state.quickFillHeight - dif;
    // In case the new heihgt exceeds the maximum value no resize is happening
    if (newHeight > this.state.quickFillMaxHeight) {
      return;
    }
    this.setState({
      quickFillHeight: this.state.quickFillHeight - dif,
      contractContentMaxHeight: this.state.contractContentMaxHeight + dif,
    });
  }

  handleAlertDismiss() {
    this.setState({alertVisible: false});
  }

  render() {
    if (!this.props.document) {
      return (
        <div>
          <Loader loading={this.props.loading} message={this.props.view ? this.props.view.loaderMessage : null} />
        </div>
      );
    }

    const resizable = {
      height: `${this.state.quickFillHeight}px`,
      maxHeight: `${this.state.quickFillMaxHeight}px`,
    };
    const {titleBarInfo} = this.props;

    return (
      <div>
        <Loader loading={this.props.loading} message={this.props.view ? this.props.view.loaderMessage : null} />
        <div fluid id="contractTitleBar">
          <h4>Contract tool</h4>
          <h3>{titleBarInfo.label}</h3>
            <ButtonToolbar>
              {titleBarInfo.primaryButtonCallback &&
                <button className="primaryButton" onClick={titleBarInfo.primaryButtonCallback}>
                  {titleBarInfo.primaryButtonLabel}
                </button>
              }
              {titleBarInfo.primaryButtonHref &&
                <a href={titleBarInfo.primaryButtonHref}>
                  <button className="primaryButton">{titleBarInfo.primaryButtonLabel}</button>
                </a>
              }
              <a href={titleBarInfo.secondaryButtonHref}>
                <button className="primaryButton">{titleBarInfo.secondaryButtonLabel}</button>
              </a>
            </ButtonToolbar>
        </div>
        {this.props.contractInfo ?
          <div id="contractContainer">
            <ContractSideBar
              isExpanded={this.props.view.sidebarIsVisible}
              centralWorkingDays={this.props.contractInfo.centralWorkingDays || 'Not filled'}
              remoteWorkingDays={this.props.contractInfo.remoteWorkingDays || 'Not filled'}
              expertInfo={this.props.contractInfo.expertInfo}
              poolInfo={this.props.contractInfo.poolInfo}
            />
            <Grid id="contractGridContent" fluid onDragOver={this.handleDragOver}>
              <div id="contractEditorResizable" style={resizable}>
                <General
                  {...this.props.contractInfo}
                  previousContractInfo={this.props.previousContractInfo}
                  contractNumber={this.props.contractNumber}
                  specOptionsInfo={this.props.specOptionsInfo}
                  generalOptionsInfo={this.props.generalOptionsInfo}
                  datesRules={this.props.datesRules}
                  isTermsOfReferenceRequired={this.props.contractInfo.poolInfo.isTermsOfReferenceRequired}
                  applyValidation={this.props.applyValidation}
                  isViewMode={this.props.isViewMode}
                />
                <div id="resizableBar" draggable onDragStart={this.handleDragStart} onDragEnd={this.handleDragEnd}>
                  <ResizableButton />
                  <ResizableButton />
                  <ResizableButton />
                </div>
              </div>
              <ContractContent
                cover={this.props.document.cover}
                chapters={this.props.document.chapters}
                annexes={this.props.document.annexes}
                maxHeight={this.state.contractContentMaxHeight}
                isViewMode={this.props.isViewMode}
              />
            </Grid>
          </div> :
          null}
      </div>
    );
  }
}

Contract.propTypes = {
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
};

export default Contract;

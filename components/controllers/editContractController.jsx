import React, {Component, PropTypes} from 'react';
import {withRouter, routerShape} from 'react-router';

import ContractStore from 'stores/contractStore';
import ContractActions from 'contractActions';
import Contract from 'contract';
import GlobalStateManager from 'services/globalStateManager';
import {CONTRACT_BASE} from 'configConstants';

class EditContractController extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const {contractNumber} = this.props.params;
    this.unsubscribe = ContractStore.listen(this.onChange);
    ContractActions.loadContract(contractNumber);
    window.onbeforeunload = this.routerWillLeave;
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  // Method to setState based upon Store changes
  onChange(newState) {
    this.setState(newState);
  }

  routerWillLeave() {
    if (ContractStore.isDirty()) {
      return 'You have unsaved changes that will be lost if you nagivate away.';
    }
    // return false to prevent a transition w/o prompting the user,
    // or return a string to allow the user to decide:
    return GlobalStateManager.allowNavigation() ? undefined : false;
  }

  render() {
    const {contractNumber} = this.props.params;
    const titleBarInfo = {
      label: `Updating Contract: ${contractNumber}`,
      primaryButtonLabel: 'Update',
      primaryButtonCallback: () => { ContractActions.updateContract(contractNumber); },
      secondaryButtonLabel: 'Download',
      secondaryButtonHref: `${CONTRACT_BASE}downloadContract/${contractNumber}`,
    };

    const alertMessage = `Please read carefully the contract/amendment before finalising! Report any error in the text to the EC RDG APPLICATION HELPDESK
    and do not finalise the contract until the issue is solved. The data in amendments created before July 4, 2016 have been migrated to reflect the correct legal
    approach that amendments replace the previous legal commitment instead of only showing the additions brought by the amendment.`;
    
    return (
      <Contract
        alertMessage={alertMessage}
        loading={this.state.loading}
        contractInfo={this.state.contractInfo}
        datesRules={this.state.datesRules}
        document={this.state.document}
        specOptionsInfo={this.state.specOptionsInfo}
        generalOptionsInfo={this.state.generalOptionsInfo}
        view={this.state.view}
        applyValidation={this.state.applyValidation}
        contractNumber={this.props.params.contractNumber}
        titleBarInfo={titleBarInfo}
      />
    );
  }
}

EditContractController.propTypes = {
  params: PropTypes.object.isRequired,
  router: routerShape,
  route: PropTypes.object.isRequired,
};

export default withRouter(EditContractController);

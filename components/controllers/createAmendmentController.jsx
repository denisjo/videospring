import React, {Component, PropTypes} from 'react';
import {withRouter, routerShape} from 'react-router';

import ContractStore from 'stores/contractStore';
import ContractActions from 'actions/contractActions';
import Contract from 'contract';
import GlobalStateManager from 'services/globalStateManager';
import {EMI_MANAGE_POOL} from 'configConstants';

class CreateAmendmentController extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const {poolCode, candReference} = this.props.params;
    this.unsubscribe = ContractStore.listen(this.onChange);
    ContractActions.prepareAmendment(poolCode, candReference);
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
    const {poolCode, candReference} = this.props.params;
    const titleBarInfo = {
      label: 'Create amendment',
      primaryButtonLabel: 'Create',
      primaryButtonCallback: () => { ContractActions.createAmendment(poolCode, candReference); },
      secondaryButtonLabel: 'Cancel',
      secondaryButtonHref: `${EMI_MANAGE_POOL}?action=update&poolCode=${poolCode}&poolTab=tpc`,
    };

    const alertMessage = `Changes to the Amendment Process Amendments follow now a correct legal approach by replacing the previous legal commitment.
    Be careful by updating the values that are subject of the amendment without removing what remains valid (ie please ensure that you fill-in the total values
    and not just the additions brought by the amendment). The wording of Article 3 of  the amendment has changed.
    Previously, users entered positive or negative numbers in an "Additional Days" field to add or subtract working days for the expert task.
    This was problematic. In the new Contract Engine, this section of the amendment is treated like a new contract.
    You simply replaces the allotted number of days in the appropriate fields.`;

    return (
      <Contract
        alertMessage={alertMessage}
        loading={this.state.loading}
        contractInfo={this.state.contractInfo}
        previousContractInfo={this.state.previousContractInfo}
        datesRules={this.state.datesRules}
        document={this.state.document}
        specOptionsInfo={this.state.specOptionsInfo}
        generalOptionsInfo={this.state.generalOptionsInfo}
        view={this.state.view}
        applyValidation={this.state.applyValidation}
        titleBarInfo={titleBarInfo}
      />
    );
  }
}

CreateAmendmentController.propTypes = {
  params: PropTypes.object.isRequired,
  router: routerShape,
  route: PropTypes.object.isRequired,
};

export default withRouter(CreateAmendmentController);

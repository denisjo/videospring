import React, {Component, PropTypes} from 'react';
import {withRouter, routerShape} from 'react-router';

//import ContractStore from 'stores/contractStore';
//import ContractActions from 'contractActions';
//import Contract from 'contract';
//import GlobalStateManager from 'services/globalStateManager';
//import {CONTRACT_BASE, EMI_MANAGE_POOL} from 'configConstants';

class SerieCustomizerController extends Component {
  constructor(props) {
    super(props);

    //this.state = {};
    //this.onChange = this.onChange.bind(this);
  }

  /*componentDidMount() {
    ContractActions.loadContract(this.props.params.contractNumber);
    this.unsubscribe = ContractStore.listen(this.onChange);
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
    // for this specific case we still need this hook to disable navigating
    // when we are disconnected from the server
    return GlobalStateManager.allowNavigation() ? undefined : false;
  }*/

  render() {
    /*let poolCode = '';
    const {contractNumber} = this.props.params;
    if (this.state.contractInfo) {
      poolCode = this.state.contractInfo.poolInfo.code;
    }
    const titleBarInfo = {
      label: `View Contract: ${contractNumber}`,
      primaryButtonLabel: 'Download',
      primaryButtonHref: `${CONTRACT_BASE}downloadContract/${contractNumber}`,
      secondaryButtonLabel: 'Cancel',
      secondaryButtonHref: `${EMI_MANAGE_POOL}?action=update&poolCode=${poolCode}&poolTab=tpc`,
    };

    const alertMessage = `The data in amendments created before July 4, 2016 have been migrated to reflect the correct legal approach that amendments replace
    the previous legal commitment instead of only showing the additions brought by the amendment. Please consult the final PDF for the original
    version by clicking on the Amendment number.`;
    */
    return (
      <h1>Customizing Serie</h1>
    );
  }
}

/*AdminController.propTypes = {
  params: PropTypes.object.isRequired,
  router: routerShape,
  route: PropTypes.object.isRequired,
};*/

export default withRouter(SerieCustomizerController);

/* eslint new-cap:0 */
import Reflux, {createActions} from 'reflux';
import RefluxPromise from 'reflux-promise';
import _ from 'lodash';

import ContractService from 'services/contractService';

Reflux.use(RefluxPromise(window.Promise));

const apiActions = createActions({
  prepareContract: {children: ['completed', 'failed']},
  refreshContract: {children: ['completed', 'failed']},
  loadContract: {children: ['completed', 'failed']},
  prepareAmendment: {children: ['completed', 'failed']},
  createContract: {children: ['completed', 'failed']},
  updateContract: {children: ['completed', 'failed']},
  createAmendment: {children: ['completed', 'failed']},
});
apiActions.prepareContract.listenAndPromise(ContractService.prepareContract);
apiActions.refreshContract.listenAndPromise(ContractService.refreshContract);
apiActions.loadContract.listenAndPromise(ContractService.getContract);
apiActions.prepareAmendment.listenAndPromise(ContractService.prepareAmendment);

const flatActions = createActions([
  'saveContract',
  'updateContractInfo',
  'updateGeneralOption',
  'updateGeneralOptions',
  'updateDocument',
  'toggleSidebar',
  'expandAll',
  'collapseAll',
  'toggleCover',
  'toggleChapter',
  'toggleArticle',
  'toggleAnnex',
  'addTermOfReference',
  'specOptionFocus',
  'specOptionBlur',
]);

const actions = _.assign({}, apiActions, flatActions);

export default actions;

/* eslint no-param-reassign: 0*/
// Probably we need to enable this rule and write the functions with map
import {createStore} from 'reflux';
import _ from 'lodash';
import {hashHistory} from 'react-router';


const state = {
  
};

const ContractStore = createStore({
  listenables: ContractActions,

  init() {
    
  },

  isDirty() {
    /*if (!state.contractInfo || !originalState.contractInfo) {
      return false;
    }
    return !_.isEqual(state.contractInfo, originalState.contractInfo);*/
    return false;
  },
  // This method is used only in one place just to have access to callIds list for annex2 table
  getState() {
    return state;
  }
});

export default VideoAssetsStore;
import React from 'react';
import {Route} from 'react-router';

import App from 'app';
import ViewContractController from 'controllers/viewContractController';
import CreateContractController from 'controllers/createContractController';
import EditContractController from 'controllers/editContractController';
import CreateAmendmentController from 'controllers/createAmendmentController';

export default (
  <Route path="/" component={App}>
    <Route path="/viewcontract/:contractNumber" component={ViewContractController} />
    <Route path="/createcontract/:poolCode/:candReference" component={CreateContractController} />
    
    
  </Route>
);

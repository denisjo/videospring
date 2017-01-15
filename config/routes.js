import React from 'react';
import {Route, Router, browserHistory} from 'react-router';

import App from 'app';
//import ViewContractController from 'controllers/viewContractController';
//import CreateContractController from 'controllers/createContractController';
//import EditContractController from 'controllers/editContractController';
//import CreateAmendmentController from 'controllers/createAmendmentController';
import AdminController from 'controllers/adminController';
import SerieCustomizerController from 'controllers/serieCustomizerController';
import SerieController from 'controllers/serieController';

export default (
  <div>
    <Router history={browserHistory}>
    <Route path="/" component={App} >
      <Route path="/serie/:serieId/:serieName" component={SerieController}/>
    </Route>
    <Route path="admin" component={AdminController} />
    <Route path="customize" component={SerieCustomizerController} />
    </Router>
  </div>
);

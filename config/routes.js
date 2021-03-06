import React from 'react';
import {Route, Router, IndexRoute, browserHistory} from 'react-router';

import App from 'app';
//import ViewContractController from 'controllers/viewContractController';
//import CreateContractController from 'controllers/createContractController';
//import EditContractController from 'controllers/editContractController';
//import CreateAmendmentController from 'controllers/createAmendmentController';
import AdminController from 'controllers/adminController';
import SerieCustomizerController from 'controllers/serieCustomizerController';
import SerieController from 'controllers/serieController';

import Home from 'home';
import Serie from 'serie';
import Series from 'series';
import SerieComponentItem from 'serieComponentItem';

export default (
  <div>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <IndexRoute component={Home} />
        <Route path="serie/:serieId/:serieName" component={Serie} />
        <Route path="serie/:serieId/:serieName/component/:componentId" component={SerieComponentItem}/>

        <Route path="admin" component={AdminController} />
        <Route path="customize" component={SerieCustomizerController} />
      </Route>
      
    </Router>
  </div>
);
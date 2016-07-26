/* eslint  no-use-before-define:0 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, hashHistory} from 'react-router';
// We need to include the polyfill in order to solve some issues with promises in IE
import 'babel-polyfill';
import 'bootstrap';

import 'expose?clientSideStateManager!../../services/globalStateManager';
import '../less/style.less';

import routes from '../../config/routes';

ReactDOM.render((<Router routes={routes} history={hashHistory} />), document.getElementById('main'));


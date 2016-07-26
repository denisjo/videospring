import React from 'react';
import {Grid} from 'react-bootstrap';

import HeaderMenu from 'headerMenu';
import MainMenu from 'mainMenu';

import './navigation.less';

export default () => (
  <Grid fluid>
    <HeaderMenu username="karypch" fullName="charalampos KARYPIDIS" />
    <MainMenu />
  </Grid>
);

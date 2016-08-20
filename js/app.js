require('angular');
require('../styles/main.scss');

import { isEmpty } from "lodash";
import { getCookies } from "./helpers";
import { authenticate } from "./sources";


const cccApp = angular.module('cccApp', []);

cccApp.controller('adminCtrl', ($scope) => {
  $scope.authenticated = false;
  $scope.status = '';
  $scope.submitting = false;
  $scope.email = '';
  let cookies = getCookies();

  if(isEmpty(cookies.auth)){
    //ok so let them authenticate
    //don't do anything
  } else {
    //they have the cookie so let them try some stuff.
  }

  $scope.submit = () => {
    console.log('submitting', $scope.email);
    $scope.submitting = true;
    $scope.status = "Please wait ...";
    let self = $scope;
    authenticate($scope.email, (resp) => {
      console.log('scope callback', resp, self);
    });
  }

});


require('angular');
require('../styles/main.scss');

const cccApp = angular.module('cccApp', []);

cccApp.controller('adminCtrl', ($scope) => {
  $scope.authenticated = false;

});
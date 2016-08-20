require('angular');
require('../styles/main.scss');

import { isEmpty, reject } from "lodash";
import { getCookies, setCookie } from "./helpers";
import { add, authenticate, getTeams, removeTeam } from "./sources";


const cccApp = angular.module('cccApp', []);

cccApp.controller('adminCtrl', ($scope) => {
  $scope.authenticated = false;
  $scope.status = '';
  $scope.submitting = false;
  $scope.email = '';
  $scope.password = '';
  $scope.section = 'teams';
  $scope.teamName = '';
  $scope.teams = [];
  $scope.division = 'rx';
  $scope.key = '';
  $scope.toRemove = '';

  let cookies = getCookies();
  if(isEmpty(cookies.auth)){
    //ok so let them authenticate
    //don't do anything
  } else {
    $scope.authenticated = true;
    $scope.key = cookies.auth;
    //they have the cookie so let them try some stuff.
  }
  //submit function
  $scope.submit = () => {
    $scope.submitting = true;
    $scope.status = "Please wait ...";
    var self = this;
    authenticate($scope.email, $scope.password, (response) => {
      let data = response.body;
      if(data.success){
        //look data.data is stupid.  if you are reading this I'm sorry.  If this wasn't
        //pro bono I would totally make these names not terrible
        setCookie('auth', data.data.key);
        $scope.key = data.data.key;

        $scope.$apply( ()=> { 
          $scope.authenticated = true;
          $scope.status = '';
        });
      } else {
        console.log('no way get out');
          $scope.$apply(() => {
            $scope.status = "Bro - you aren't supposed to be here.  225# bench and higher only";
        });
      }
    });
  }
  //add function
  $scope.addTeam = (name, division) => {
    $scope.status = 'Submitting Team';
    const payload = {
      name: name,
      tournament: 'ccc2016',
      division: division,
      key: $scope.key,
    }
    add(payload, (response) => {
      let data = response.body;
      console.log('callback addTeam', data);
      if(data.success){
        $scope.$apply(() => {
          $scope.status = "Team added successfully";
          $scope.teams = data.data;
        });
      } else {
        //get the message what happened.  probably team exists
        $scope.$apply( () => {
          $scope.status = data.msg;
        });
      }
    });
  }
  //remove team
  $scope.removeTeam = (guid) => {
    removeTeam(guid, (response) => {
      if(response.body.success){
        $scope.$apply( () => {
          $scope.teams = reject($scope.teams, (team) => {
            return team.guid === guid;
          });
        });
      }
    });
  }
  getTeams('ccc2016', (response) => {
    if(response.body.success){
      $scope.$apply(() => {
        $scope.teams = response.body.data;
      });
    }
  });
});


﻿
module SmashLeague.Teams {
  'use strict';

  export class Application {
    
    public static Module: ng.IModule;

    public static Config(
      stateProvider: ng.ui.IStateProvider) {

      stateProvider.state('Team', {
        url: '/team',
        views: {
          'Banner': {
            template: '<div class="banner banner-blue"></div>'
          },
          'Content': {
            templateUrl: '/teams/content'
          }
        }
      });

      stateProvider.state('Team-New', {
        url: '/team/new',
        resolve: {
          captain: ['ProfileService', (service) => { return service.Profile }]
        },
        views: {
          'Banner': {
            template: '<div class="banner banner-blue"></div>'
          },
          'Content': {
            templateUrl: '/teams/new',
            controller: 'NewTeamController'
          }
        }
      });
    }
  }

  Application.Config.$inject = ['$stateProvider'];

  Application.Module = angular.module('SmashLeague.Team', [
    'ui.router',
    'ngDragDrop',
    'SmashLeague.Player',
    'SmashLeague.Profile'
  ]);
  
  Application.Module.config(Application.Config);
}
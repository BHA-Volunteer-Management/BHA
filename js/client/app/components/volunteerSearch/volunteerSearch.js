import angular from 'angular';
import uiRouter from 'angular-ui-router';
import volunteerSearchComponent from './volunteerSearch.component';
import uiSelect from 'ui-select';

let volunteerSearchModule = angular.module('volunteerSearch', [
  uiRouter,
  uiSelect
]).config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('volunteerSearch', {
      url: '/',
      template: '<volunteerSearch></volunteerSearch>'
    });
}]).component('volunteerSearch', volunteerSearchComponent);

export default volunteerSearchModule;

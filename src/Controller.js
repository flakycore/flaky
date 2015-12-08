import angular from 'angular';
import {inject} from './core/decorators';

@inject('$scope', '$stateParams', '$filter')
export class Controller {

  constructor(scope, stateParams, filterService) {
    this._scope = scope;
    this._stateParams = stateParams;
    this._filterService = filterService;
  }

  get parent() {
    return this._scope.parent;
  }

  hasParent() {
    return angular.isDefined(this.parent);
  }

  getFilter(name) {
    return this._filterService(name);
  }

  getParam(name) {
    return this._stateParams[name];
  }

  hasParam(name) {
    return angular.isDefined(this._stateParams[name]);
  }

  on(eventName, callback) {
    this._scope.$on(eventName, callback);
  }
}

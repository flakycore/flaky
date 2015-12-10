import angular from 'angular';
import {inject} from './decorators';
import {Utils} from './core/Utils';

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
    return Utils.isDefined(this.parent);
  }

  getFilter(name) {
    return this._filterService(name);
  }

  getParam(name) {
    return this._stateParams[name];
  }

  hasParam(name) {
    return Utils.isDefined(this._stateParams[name]);
  }

  on(eventName, callback) {
    this._scope.$on(eventName, callback);
  }
}

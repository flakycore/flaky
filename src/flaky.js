import angular from 'angular';
import {Application} from './Application';

let instance = null;

class Flaky {

  constructor() {
    if (!instance) {
      this._vendors = [];
      this._controllers = [];
      this._routes = [];
      this._services = [];
      this._components = [];
      this._directives = [];
      this._filters = [];
      this._application = null;
      this._nativeAppModule = null;
      instance = this;
    }
    return instance;
  }

  set application(application) {
    this._application = application;
  }

  set vendors(vendors) {
    this._vendors = vendors;
  }

  bootstrap() {
    angular.element(document).ready(() => this.doReady());
  }

  doReady() {
    if (!this._application instanceof Application) {
      throw new Error('application in not instance "Application"');
    }

    let routesModule = this.createRoutesModule();

    this._nativeAppModule = angular.module(flaky.normalizeName(this._application.name.toLocaleLowerCase()), [
      routesModule.name
    ]);

    this.initApplication();

    this.loadControllers();
    this.loadComponents();
    this.loadDirectives();
    this.loadServices();
    this.loadFilters();

    angular.bootstrap(document, this._vendors.concat([
      this._nativeAppModule.name
    ]));
  }

  initApplication() {
    let injectConfig = [];
    let injectRun = [];

    if (angular.isArray(this._application.constructor.$injectConfig)) {
      injectConfig = injectConfig.concat(this._application.constructor.$injectConfig);
    }

    if (angular.isArray(this._application.constructor.$injectRun)) {
      injectRun = injectRun.concat(this._application.constructor.$injectRun);
    }

    this._nativeAppModule.config(Flaky.createInjectedFunction((...dependencies) => {
      if (angular.isFunction(this._application.config)) {
        module.config.apply(this._application, dependencies);
      }
    }, injectConfig));

    this._nativeAppModule.run(Flaky.createInjectedFunction((...dependencies) => {
      if (angular.isFunction(this._application.run)) {
        module.run.apply(this._application, dependencies);
      }
    }, injectRun));
  }

  loadControllers() {
    for (let controller of this._controllers) {
      this._nativeAppModule.controller(controller.name, controller);
    }
  }

  loadComponents() {
    for (let component of this._components) {
      if (component.$selector) {
        throw new Error('Not set selector for component "' + component.name + '"');
      }

      let options = {
        restrict: 'E',
        bindToController: true,
        controller: component.name + ' as ctrl' + Flaky.normalizeControllerAsName(component.name)
      };

      options = angular.extend(options, component.$options);


      this._nativeAppModule.directive(component.$selector, function() {
        return options;
      });
    }
  }

  loadDirectives() {
    for (let directive of this._directives) {
      if (directive.$selector) {
        throw new Error('Not set selector for directive "' + directive.name + '"');
      }

      let options = {
        restrict: 'A',
        bindToController: true,
        controller: directive.name + ' as ctrl' + Flaky.normalizeControllerAsName(directive.name)
      };

      options = angular.extend(options, directive.$options);

      this._nativeAppModule.directive(directive.$selector, function() {
        return options;
      });
    }
  }

  loadServices() {
    for (let service of this._services) {
      this._nativeAppModule.service(Flaky.normalizeServiceName(service.name), service);
    }
  }

  loadFilters() {
    for (let filter of this._filters) {
      this._nativeAppModule.filter(filter.$name, filter);
    }
  }

  createRoutesModule() {
    let routesModule = angular.module(Flaky.normalizeName('routes'));

    routesModule.config(['$stateProvider', (stateProvider) => {
      for (let [name, config] of this._routes) {
        stateProvider.state(name, config);
      }
    }]);
  }

  addController(controller) {
    this._controllers.push(controller);
    return this;
  }

  addService(service) {
    this._services.push(service);
    return this;
  }

  addComponent(provider) {
    this._components.push(provider);
    return this;
  }

  addDirective(directive) {
    this._directives.push(directive);
    return this;
  }

  addFilter(provider) {
    this._filters.push(provider);
    return this;
  }

  addRoute(controller, config, name) {
    if(!angular.isFunction(controller)) {
      if(name === false) {
        name = Flaky.normalizeRouteName(controller);
      }
    }

    if(name === false) {
      throw new Error('Not set route name');
    }

    config = angular.extend({
      controller: controller
    }, config);

    this._routes.push([name, config]);

    return this;
  }

  static normalizeControllerAsName(controllerName) {
    return controllerName.replace('Controller', '').charAt(0).toUpperCase() + controllerName.slice(1);
  }

  static normalizeRouteName(controllerName) {
    return controllerName.replace('Controller', '').charAt(0).toLowerCase() + controllerName.slice(1);
  }

  static normalizeServiceName(serviceName) {
    return '$' + serviceName.replace('Service', '').charAt(0).toUpperCase() + serviceName.slice(1);
  }

  static createInjectedFunction(callback, inject) {
    callback.$inject = inject;
    return callback;
  }

  get routes() {
    return this._routes;
  }

  get controllers() {
    return this._controllers;
  }

  get services() {
    return this._services;
  }

  get components() {
    return this._components;
  }

  get directives() {
    return this._directives;
  }

  get filters() {
    return this._filters;
  }
}

export const flaky = new Flaky();

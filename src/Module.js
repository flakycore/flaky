import angular from 'angular';
import {injectConfig} from './core/decorators'

@injectConfig('$stateProvider')
export class Module {

  constructor(name) {
    this._name = name;
    this._angularModule = null;
    this._vendors = [];
    this._controllers = [];
    this._routes = [];
    this._services = [];
    this._components = [];
    this._directives = [];
    this._filters = [];
    this._modules = [];
  }

  run() {
  }

  config(stateProvider) {
    for (let [name, config] of this._routes) {
      stateProvider.state(name, config);
    }
  }

  load() {
    let modules = [];

    for(let module of this._modules) {
      modules.push(module.load());
    }

    this._angularModule = angular.module(this._name, this._vendors.concat(modules));

    this.initRunAndConfig();

    this.loadControllers();
    this.loadComponents();
    this.loadDirectives();
    this.loadServices();
    this.loadFilters();

    return this._angularModule.name;
  }

  /**
   * Initialization application methods run and config (analog angular.module functions)
   */
  initRunAndConfig() {
    let injectConfig = [];
    let injectRun = [];

    if (angular.isArray(this.constructor.$injectConfig)) {
      injectConfig = injectConfig.concat(this.constructor.$injectConfig);
    }

    if (angular.isArray(this.constructor.$injectRun)) {
      injectRun = injectRun.concat(this.constructor.$injectRun);
    }

    this._angularModule.config(Module.createInjectedFunction((...dependencies) => {
      if (angular.isFunction(this.config)) {
        this.config.apply(this, dependencies);
      }
    }, injectConfig));

    this._angularModule.run(Module.createInjectedFunction((...dependencies) => {
      if (angular.isFunction(this.run)) {
        this.run.apply(this, dependencies);
      }
    }, injectRun));
  }

  /**
   * Initialization controllers (AngularJS controller)
   */
  loadControllers() {
    for (let controller of this._controllers) {
      this._angularModule.controller(controller.name, controller);
    }
  }

  /**
   * Initialization components (AngularJS directive set "restrict" to element)
   */
  loadComponents() {
    for (let component of this._components) {
      if (component.$selector) {
        throw new Error('Not set selector for component "' + component.name + '"');
      }

      let options = {
        restrict: 'E',
        bindToController: true,
        controller: component.name + ' as ctrl' + Module.normalizeControllerAsName(component.name)
      };

      options = angular.extend(options, component.$options);


      this._angularModule.directive(component.$selector, function() {
        return options;
      });
    }
  }

  /**
   * Initialization components (AngularJS directive set "restrict" to attribute)
   */
  loadDirectives() {
    for (let directive of this._directives) {
      if (directive.$selector) {
        throw new Error('Not set selector for directive "' + directive.name + '"');
      }

      let options = {
        restrict: 'A',
        bindToController: true,
        controller: directive.name + ' as ctrl' + Module.normalizeControllerAsName(directive.name)
      };

      options = angular.extend(options, directive.$options);

      this._angularModule.directive(directive.$selector, function() {
        return options;
      });
    }
  }

  /**
   * Initialization components (AngularJS service)
   */
  loadServices() {
    for (let service of this._services) {
      this._angularModule.service(Module.normalizeServiceName(service.name), service);
    }
  }

  /**
   * Initialization components (AngularJS filter)
   */
  loadFilters() {
    for (let filter of this._filters) {
      this._angularModule.filter(filter.$name, filter);
    }
  }

  /**
   * Add controller
   * @param controller {string|function}
   * @returns {Module}
   */
  addController(controller) {
    this._controllers.push(controller);
    return this;
  }

  /**
   * Add service
   * @param service
   * @returns {Module}
   */
  addService(service) {
    this._services.push(service);
    return this;
  }

  /**
   * Add component
   * @param component
   * @returns {Module}
   */
  addComponent(component) {
    this._components.push(component);
    return this;
  }

  /**
   * Add directive
   * @param directive
   * @returns {Module}
   */
  addDirective(directive) {
    this._directives.push(directive);
    return this;
  }

  /**
   * Add filter
   * @param filter
   * @returns {Module}
   */
  addFilter(filter) {
    this._filters.push(filter);
    return this;
  }

  /**
   * Add route
   * @param controller {string|function}
   * @param config {hash}
   * @param name {string}
   * @returns {Module}
   */
  addRoute(controller, config, name) {
    if (!angular.isFunction(controller)) {
      if (name === false) {
        name = Module.normalizeRouteName(controller);
      }
    }

    if (name === false) {
      throw new Error('Not set route name');
    }

    config = angular.extend({
      controller: controller
    }, config);

    this._routes.push([name, config]);

    return this;
  }

  /**
   * Add module
   * @param module {Module}
   * @returns {Module}
   */
  addModule(module) {
    this._modules.push(module);
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

  get name() {
    return this._name;
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

  get modules() {
    return this._modules;
  }

  get vendors() {
    return this._vendors;
  }

  set vendors(vendors) {
    this._vendors = vendors;
  }
}

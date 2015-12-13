import angular from 'angular';
import {Utils} from './core/Utils';

export class Module {

  constructor(name) {
    this._name = name;
    this._angularModule = null;
    this._vendors = [];
    this._controllers = [];
    this._services = [];
    this._components = [];
    this._directives = [];
    this._filters = [];
    this._interceptors = [];
    this._configurations = [];
    this._modules = [];
  }

  run() {
  }

  load() {
    let modules = [];

    for (let module of this._modules) {
      modules.push(module.load());
    }

    let configModuleNames = this.loadConfigurations();

    modules = this._vendors.concat(configModuleNames.concat(modules));

    this._angularModule = angular.module(this._name, modules);

    this.initRun();

    this.loadControllers();
    this.loadComponents();
    this.loadDirectives();
    this.loadServices();
    this.loadFilters();
    this.loadInterceptors();

    return this._angularModule.name;
  }

  /**
   * Initialization application methods run and config (analog angular.module functions)
   */
  initRun() {
    let inject = [];

    if (Utils.isArray(this.constructor.$inject)) {
      inject = inject.concat(this.constructor.$inject);
    }

    this._angularModule.run(Utils.createInjectedFunction((...dependencies) => {
      if (Utils.isFunction(this.run)) {
        this.run(...dependencies);
      }
    }, inject));
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
    for (let [component, options] of this._components) {
      let componentOptions = angular.extend({
        restrict: 'E',
        bindToController: true,
        controller: component.name + ' as ' + Utils.normalizeComponentAsName(component.name)
      }, options);

      this._angularModule.directive(Utils.normalizeComponentName(component.name), () => {
        return componentOptions;
      });
    }
  }

  /**
   * Initialization components (AngularJS directive set "restrict" to attribute)
   */
  loadDirectives() {
    for (let [directive, options] of this._directives) {
      let directiveOptions = angular.extend({
        restrict: 'A',
        bindToController: true,
        controller: directive.name + ' as ' + Utils.normalizeDirectiveAsName(directive.name)
      }, options);

      this._angularModule.directive(Utils.normalizeDirectiveName(directive.name), () => {
        return directiveOptions;
      });
    }
  }

  /**
   * Initialization components (AngularJS service)
   */
  loadServices() {
    for (let service of this._services) {
      this._angularModule.service(Utils.normalizeServiceName(service.name), service);
    }
  }

  /**
   * Initialization filters (AngularJS filter)
   */
  loadFilters() {
    for (let filter of this._filters) {
      if (!Utils.isFunction(filter.prototype.run)) {
        throw new Error('Filter "' + filter.name + '" has no a run() function');
      }

      let filterFactory = Utils.createInjectedFunction((...dependencies) => {
        let filterInstance = new filter(...dependencies);
        let filterFn;

        filterFn = (...args)=> {
          return filterInstance.run(...args);
        };

        return filterFn;
      }, filter.$inject);

      this._angularModule.filter(Utils.normalizeFilterName(filter.name), filterFactory);
    }
  }

  /**
   * Initialization interceptors (AngularJS interceptor)
   */
  loadInterceptors() {
    for (let [interceptor, type] of this._interceptors) {
      let availTypes = ['request', 'requestError', 'response', 'responseError'];
      let interceptorName = Utils.normalizeInterceptorName(interceptor.name);

      if (availTypes.indexOf(type) === -1) {
        throw new Error('Interceptor type "' + type + '" is invalid');
      }

      if (!Utils.isFunction(interceptor.prototype.run)) {
        throw new Error('Interceptor "' + filter.name + '" has no a run() function');
      }

      let interceptorFactory = Utils.createInjectedFunction((...dependencies) => {
        let interceptorInstance = new interceptor(...dependencies);
        let interceptorProxy = [];

        interceptorProxy[type] = (...args) => {
          return interceptorInstance.run(...args);
        };

        return interceptorProxy;
      }, interceptor.$inject);

      this._angularModule.factory(interceptorName, interceptorFactory);
    }
  }

  /**
   * Initialization configurations
   * @returns {Array}
   */
  loadConfigurations() {
    let result = [];
    for (let configuration of this._configurations) {
      if (!Utils.isFunction(configuration.run)) {
        throw new Error('Configuration "' + filter.name + '" has no a run() function');
      }

      let configFn = Utils.createInjectedFunction((...dependencies) => {
        configuration.run(...dependencies);
      }, configuration.constructor.$inject || []);

      let angularModule = angular.module(Utils.normalizeConfigurationName(configuration.constructor.name), [])
        .config(configFn);

      result.push(angularModule.name);
    }
    return result;
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
   * @param options
   * @returns {Module}
   */
  addComponent(component, options = {}) {
    this._components.push([component, options]);
    return this;
  }

  /**
   * Add directive
   * @param directive
   * @param options
   * @returns {Module}
   */
  addDirective(directive, options = {}) {
    this._directives.push([directive, options]);
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
   * Add interceptor
   * @param interceptor
   * @param type
   * @returns {Module}
   */
  addInterceptor(interceptor, type) {
    this._interceptors.push([interceptor, type]);
    return this;
  }

  /**
   * Add configurti
   * @param configuration
   * @returns {Module}
     */
  addConfiguration(configuration) {
    this._configurations.push(configuration);
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

  /**
   * Set modules name
   * @param vendors
   * @returns {Module}
   */
  setVendors(vendors) {
    this._vendors = vendors;
    return this;
  }

  get name() {
    return this._name;
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

  get interceptors() {
    return this._interceptors;
  }

  get configurations() {
    return this._configurations;
  }

  get modules() {
    return this._modules;
  }

  get vendors() {
    return this._vendors;
  }
}

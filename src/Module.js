import angular from 'angular';
import {Utils} from './core/Utils';
import {injectConfig} from './decorators'

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

    for (let module of this._modules) {
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

    if (Utils.isArray(this.constructor.$injectConfig)) {
      injectConfig = injectConfig.concat(this.constructor.$injectConfig);
    }

    if (Utils.isArray(this.constructor.$injectRun)) {
      injectRun = injectRun.concat(this.constructor.$injectRun);
    }

    this._angularModule.config(Utils.createInjectedFunction((...dependencies) => {
      if (Utils.isFunction(this.config)) {
        this.config.apply(this, dependencies);
      }
    }, injectConfig));

    this._angularModule.run(Utils.createInjectedFunction((...dependencies) => {
      if (Utils.isFunction(this.run)) {
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
   * Initialization components (AngularJS filter)
   */
  loadFilters() {
    for (let filter of this._filters) {

      this._angularModule.filter(
        Utils.normalizeFilterName(filter.name),
        Utils.createInjectedFunction((...dependencies) => {

        let filterInstance = new filter(...dependencies);

        if(!Utils.isFunction(filterInstance.run)) {
          throw new Error('Filter "' + filter.name + '" has not a run() function');
        }
        return (...args)=>{
          return filterInstance.run(...args);
        }
      },  filter.$inject));
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
   * Add route
   * @param name
   * @param config
   * @param controller
   * @returns {Module}
   */
  addRoute(name, config, controller = false) {
    if (controller !== false) {
      if (!Utils.isFunction(controller)) {

        if (name === false) {
          name = Utils.normalizeRouteName(controller);
        }

        controller = controller + ' as ' + Utils.normalizeControllerAsName(controller);
      }

      config = angular.extend({
        controller: controller
      }, config);
    }

    if (name === false) {
      throw new Error('Not set route name');
    }

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
}

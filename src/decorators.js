import angular from 'angular';
import {Utils} from './core/Utils';
import {flaky} from './flaky';

/**
 * Add controller
 * @returns {decorator}
 */
export function controller() {
  return function decorator(target) {
    flaky.module.addController(target);
  };
}

/**
 * Add service
 * @returns {decorator}
 */
export function service() {
  return function decorator(target) {
    flaky.module.addService(target);
  };
}

/**
 * Add component
 * @param options
 * @returns {decorator}
 */
export function component(options = {}) {
  return function decorator(target) {
    flaky.module.addComponent(target, options);
    flaky.module.addController(target);
  };
}

/**
 * Add directive
 * @param options
 * @returns {decorator}
 */
export function directive(options = {}) {
  return function decorator(target) {
    flaky.module.addDirective(target, options);
    flaky.module.addController(target);
  };
}

/**
 * Add filter
 * @returns {decorator}
 */
export function filter() {
  return function decorator(target) {
    flaky.module.addFilter(target);
  };
}

/**
 * Add interceptor
 * @param type type of interceptor (request, requestError, response, responseError)
 * @returns {decorator}
 */
export function interceptor(type) {
  return function decorator(target) {
    flaky.module.addInterceptor(target, type);
  }
}

/**
 * Add configuration class for configure AngularJS provider
 * @returns {decorator}
 */
export function configuration() {
  return function decorator(target) {
    flaky.module.addConfiguration(new target());
  }
}

/**
 * Inject dependencies for services, directives, controllers, filters
 * @param dependencies
 * @returns {decorator}
 */
export function inject(...dependencies) {
  return function decorator(target) {
    let targetDependencies = [];
    let extendsProto = Object.getPrototypeOf(target);

    if (Utils.isArray(extendsProto.$inject)) {
      targetDependencies = extendsProto.$inject;
    }

    target.$inject = targetDependencies.concat(dependencies);
  };
}

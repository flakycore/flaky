import angular from 'angular';
import {flaky} from '../flaky';

export function controller(config = false) {
  return function decorator(target) {
    if (config !== false) {
      flaky.addRoute(false, config, controller.name);
    }

    flaky.addController(target);
  };
}

export function service() {
  return function decorator(target) {
    flaky.addService(target);
  };
}

export function component(options = {}) {
  return function decorator(target) {
    target.$options = options;

    flaky.addComponent(target);
    flaky.addController(target);
  };
}

export function directive(selector, options = {}) {
  return function decorator(target) {
    target.$selector = selector;
    target.$options = options;

    flaky.addDirective(target);
    flaky.addController(target);
  };
}

export function filter() {
  return function decorator(target) {
    flaky.addFilter(target);
  };
}

export function injectConfig(...dependencies) {
  return function decorator(target) {
    abstractInject('$injectConfig', target, dependencies);
  };
}

export function injectRun(...dependencies) {
  return function decorator(target) {
    abstractInject('$injectRun', target, dependencies);
  };
}

export function inject(...dependencies) {
  return function decorator(target) {
    abstractInject('$inject', target, dependencies);
  };
}

function abstractInject(name, target, dependencies) {
  let targetDependencies = [];
  let extendsProto = Reflect.getPrototypeOf(target);

  if (angular.isArray(extendsProto[name])) {
    targetDependencies = extendsProto[name];
  }

  target[name] = targetDependencies.concat(dependencies);
}

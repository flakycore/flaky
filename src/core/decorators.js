import angular from 'angular';
import {flaky} from '../flaky';

export function controller(config = false) {
  return function decorator(target) {
    if (config !== false) {
      flaky.addRoute(controller.name, config);
    }

    flaky.addController(target);
  };
}

export function service() {
  return function decorator(target) {
    flaky.addService(target);
  };
}

export function component(selector, options = {}) {
  return function decorator(target) {
    target.$selector = selector;
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

export function filter(name) {
  return function decorator(target) {
    target.$name = name;
    flaky.addFilter(name, target);
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
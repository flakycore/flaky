import angular from 'angular';
import {Module} from './Module';

/**
 * Flaky singleton instance
 * @type {Flaky}
 */
let instance = null;

class Flaky {

  constructor() {
    if (!instance) {
      this._module = new Module('flaky');
      instance = this;
    }
    return instance;
  }

  /**
   * Bootstrap angularJS application
   * @param application
   */
  bootstrap(application) {
    application.addModule(this._module);

    application.load();

    angular.element(document).ready(() => {
      angular.bootstrap(document, [application.name]);
    });
  }

  get module() {
    return this._module;
  }
}

export const flaky = new Flaky();

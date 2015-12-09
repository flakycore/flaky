import angular from 'angular';
import {Application} from './Application';
import {Module} from './Module';

/**
 * Singleton instance
 * @type {Flaky}
 */
let instance = null;

class Flaky extends Module {

  constructor() {
    if (!instance) {
      super('flaky');
      instance = this;
    }
    return instance;
  }

  /**
   * Bootstrap angularJS application
   * @param application
   */
  bootstrap(application) {
    application.addModule(this);
    application.load();

    angular.element(document).ready(() => {
      angular.bootstrap(document, [application.name]);
    });
  }
}

export const flaky = new Flaky();

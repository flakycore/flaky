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
  bootstrap(application = null) {
    angular.element(document).ready(() => this.doReady(application));
  }

  /**
   * @param application
   */
  doReady(application) {
    if(application !== null) {
      this.addModule(application);
    }

    angular.bootstrap(document, [this.name]);
  }
}

export const flaky = new Flaky();

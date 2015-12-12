import {Module} from './Module';
import {inject} from './decorators';

@inject('$rootScope')
export class Application extends Module {

  constructor(name) {
    super(name);
  }

  run(rootScope) {
    super.run();

    rootScope.$on('$stateChangeStart', (...args) => {
      this.onStateChangeStart.call(args);
    });

    rootScope.$on('$stateChangeSuccess', (...args) => {
      this.onStateChangeSuccess.call(args);
    });
  }

  onStateChangeStart(event, toState, toParams, fromState, fromParams) {
  }

  onStateChangeSuccess(event, toState, toParams, fromState, fromParams) {
  }
}

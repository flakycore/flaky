import {inject} from 'src/decorators';

@inject('$stateProvider')
export class StateConfiguration {

  constructor() {
  }

  run(stateProvider) {
    stateProvider.state('foo', {
      url: '/foo',
      template: '<foo></foo>'
    });
  }
}

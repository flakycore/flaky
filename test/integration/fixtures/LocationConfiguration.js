import {inject} from 'src/decorators';

@inject('$locationProvider')
export class LocationConfiguration {

  constructor() {
  }

  run(locationProvider) {
      locationProvider.html5Mode({
        'enabled': true,
        'requireBase': true,
        'rewriteLinks': true
      }).hashPrefix('!');
  }
}

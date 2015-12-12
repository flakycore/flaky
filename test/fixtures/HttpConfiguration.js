import {inject} from 'src/decorators';

@inject('$httpProvider')
export class HttpConfiguration {

  constructor() {
  }

  run(httpProvider) {
    httpProvider.interceptors.push();
  }
}

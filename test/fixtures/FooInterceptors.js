import {inject, interceptor, service} from 'src/decorators';

@inject('$fooInterceptorService')
@interceptor('response')
export class FooResponseInterceptor{

  constructor(fooInterceptorService) {
    this.fooInterceptorService = fooInterceptorService;
    this.objToExtend = {fromService: this.fooInterceptorService.getField()};
  }

  run(config) {
    return Object.assign(config, this.objToExtend);
  }
}


@inject('$fooInterceptorService')
@interceptor('request')
export class FooRequestInterceptor{

  constructor(fooInterceptorService) {
    this.fooInterceptorService = fooInterceptorService;
    this.objToExtend = {fromService: this.fooInterceptorService.getField()};
  }

  run(config) {
    return Object.assign(config, this.objToExtend);
  }
}


@inject('$fooInterceptorService')
@interceptor('responseError')
export class FooResponseErrorInterceptor{

  constructor(fooInterceptorService) {
    this.fooInterceptorService = fooInterceptorService;
    this.objToExtend = {fromService: this.fooInterceptorService.getField()};
  }

  run(config) {
    return Object.assign(config, this.objToExtend);
  }
}


@inject('$fooInterceptorService')
@interceptor('requestError')
export class FooRequestErrorInterceptor{

  constructor(fooInterceptorService) {
    this.fooInterceptorService = fooInterceptorService;
    this.objToExtend = {fromService: this.fooInterceptorService.getField()};
  }

  run(config) {
    return Object.assign(config, this.objToExtend);
  }
}


@service()
export class FooInterceptorService {

  constructor() {
    this.field = "Hello from service"
  }

  getField() {
    return this.field;
  }
}

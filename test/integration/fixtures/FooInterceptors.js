import {inject, interceptor, service} from 'src/decorators';

@inject('$fooInterceptorService')
export class FooInterceptor {

  constructor(fooInterceptorService) {
    this.fooInterceptorService = fooInterceptorService;
    this.objToExtend = {
      fromService: this.fooInterceptorService.getField()
    };
  }

  run(config) {
    return Object.assign(config, this.objToExtend);
  }
}


@interceptor('response')
export class FooResponseInterceptor extends FooInterceptor{
}


@interceptor('request')
export class FooRequestInterceptor extends FooInterceptor{
}


@interceptor('responseError')
export class FooResponseErrorInterceptor extends FooInterceptor{
}


@interceptor('requestError')
export class FooRequestErrorInterceptor extends FooInterceptor{
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

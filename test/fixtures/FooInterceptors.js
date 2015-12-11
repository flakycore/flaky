import {inject, interceptor, service} from 'src/decorators';

@inject('$fooInterceptorService')
@interceptor('response')
export class FooResponseInterceptor extends FooInterceptor{
}


@inject('$fooInterceptorService')
@interceptor('request')
export class FooRequestInterceptor extends FooInterceptor{
}


@inject('$fooInterceptorService')
@interceptor('responseError')
export class FooResponseErrorInterceptor extends FooInterceptor{
}


@inject('$fooInterceptorService')
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


export class FooInterceptor {

  constructor(fooInterceptorService) {
    this.fooInterceptorService = fooInterceptorService;
    this.objToExtend = {fromService: this.fooInterceptorService.getField()};
  }

  run(config) {
    return Object.assign(config, this.objToExtend);
  }
}

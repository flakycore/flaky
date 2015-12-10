import {service} from 'flaky/core/decorators';

@service()
export class FooService {

  constructor() {
    this.obj = {
      field: 'foo'
    };
  }

  method() {
    return 'method_foo';
  }
}

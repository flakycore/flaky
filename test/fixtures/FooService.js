import {service} from 'flaky/core/decorators';

@service()
export class FooService {

  constructor() {
    this.field = {
      name: 'foo'
    };
  }

  method() {
    return 'method_foo';
  }
}

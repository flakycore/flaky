import {service} from 'flaky/decorators';

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

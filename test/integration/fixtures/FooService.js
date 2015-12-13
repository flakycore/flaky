import {service} from 'src/decorators';

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

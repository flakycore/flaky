import {controller} from 'flaky/core/decorators';

@controller()
export class FooController {

  constructor() {
    this.user = {
      name: 'foo'
    };
  }
}

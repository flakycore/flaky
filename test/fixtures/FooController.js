import {controller} from 'flaky/decorators';

@controller()
export class FooController {

  constructor() {
    this.user = {
      name: 'foo'
    };
  }
}

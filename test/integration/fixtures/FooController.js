import {controller} from 'src/decorators';

@controller()
export class FooController {

  constructor() {
    this.user = {
      name: 'foo'
    };
  }
}

import {filter} from 'flaky/core/decorators';

@filter()
export class FooFilter {

  constructor() {

  }

  run(value) {
    return value === "10" ? 10 : 0;
  }
}

import {inject} from 'flaky/core/decorators';
import {filter} from 'flaky/core/decorators';
import {service} from 'flaky/core/decorators';

@inject('$fooFilterService')
@filter()
export class FooFilter {

  constructor(fooFilterService) {
    this.fooFilterService = fooFilterService
  }

  run(value) {
    return value === "10" ? 10 : this.fooFilterService.getField();
  }
}


@service()
export class FooFilterService {

  constructor() {
    this.field = "Hello"
  }

  getField() {
    return this.field;
  }
}

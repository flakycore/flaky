import {inject, filter, service} from 'src/decorators';

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

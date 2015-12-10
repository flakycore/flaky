import {directive, inject} from 'flaky/core/decorators';

@directive()
@inject('$element')
export class FooDirective {

  constructor(element) {
    element.html('<h1>Foo</h1>')
  }
}

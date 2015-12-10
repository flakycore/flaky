import {directive, inject} from 'flaky/core/decorators';

@directive({
  template: '<h1 ng-bind="dtFoo.name"></h1>'
})
export class FooDirective {

  constructor() {
    this.name = 'Foo';
  }
}

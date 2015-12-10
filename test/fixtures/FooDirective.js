import {directive, inject} from 'src/decorators';

@directive({
  template: '<h1 ng-bind="dtFoo.name"></h1>'
})
export class FooDirective {

  constructor() {
    this.name = 'Foo';
  }
}

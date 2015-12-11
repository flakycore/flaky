import {flaky} from 'src/flaky';
import {FooDirective} from './fixtures/FooDirective';

describe('Directive', () => {
  let $compile;
  let $rootScope;

  beforeEach(module('flakyApp'));

  beforeEach(inject((_$compile_, _$rootScope_) => {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('FooDirective should be exists in flaky', () => {
    expect(FooDirective).to.be.equals(flaky.module.directives[0][0]);
  });

  it('FooDirective replaces the element with the appropriate content', () => {
    let element = $compile("<div foo></div>")($rootScope);

    $rootScope.$digest();

    expect(element.find('h1').html()).to.contain('Foo');
  });
});

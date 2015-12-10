import {flaky} from 'flaky/flaky';
import {FooDirective} from './fixtures/FooDirective';

describe('FooDirective', () => {
  let $compile;
  let $rootScope;

  beforeEach(module('flakyApp'));

  beforeEach(inject((_$compile_, _$rootScope_) => {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should be exists in flaky', () => {
    expect(FooDirective).to.be.equals(flaky.directives[0][0]);
  });

  it('replaces the element with the appropriate content', () => {
    let element = $compile("<div foo></div>")($rootScope);

    $rootScope.$digest();

    expect(element.html()).to.contain('<h1>Foo</h1>');
  });
});

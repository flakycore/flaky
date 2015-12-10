import {flaky} from 'flaky/flaky';
import {FooComponent} from './fixtures/FooComponent';

describe('FooComponent', () => {
  let $compile;
  let $rootScope;

  beforeEach(module('flakyApp'));

  beforeEach(inject((_$compile_, _$rootScope_) => {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('should be exists in flaky', () => {
    expect(FooComponent).to.be.equals(flaky.components[0][0]);
  });

  it('replaces the element with the appropriate content', () => {
    let element = $compile("<foo></foo>")($rootScope);

    $rootScope.$digest();

    expect(element.html()).to.contain('Foo component content');
  });
});

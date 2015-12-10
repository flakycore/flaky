import {Module} from 'flaky/Module';

describe('Module', () => {
  it('normalizeComponentName should be equals "foo"', () => {
    expect(Module.normalizeComponentName('FooComponent')).to.be.equals('foo');
  });

  it('normalizeControllerAsName should be equals "ctrlFoo"', () => {
    expect(Module.normalizeControllerAsName('FooController')).to.be.equals('ctrlFoo');
  });

  it('normalizeRouteName should be equals "foo"', () => {
    expect(Module.normalizeRouteName('FooController')).to.be.equals('foo');
  });

  it('normalizeServiceName should be equals "$fooService"', () => {
    expect(Module.normalizeServiceName('FooService')).to.be.equals('$fooService');
  });

  it('normalizeDirectiveName should be equals "foo"', () => {
    expect(Module.normalizeDirectiveName('FooDirective')).to.be.equals('foo');
  });
});

import {Utils} from 'src/core/Utils';

describe('Utils', () => {
  it('normalizeComponentName should be equals "foo"', () => {
    expect(Utils.normalizeComponentName('FooComponent')).to.be.equals('foo');
  });

  it('normalizeControllerAsName for controller should be equals "ctrlFoo"', () => {
    expect(Utils.normalizeControllerAsName('FooController')).to.be.equals('ctrlFoo');
  });

  it('normalizeDirectiveAsName for directive should be equals "dtFoo"', () => {
    expect(Utils.normalizeDirectiveAsName('FooDirective')).to.be.equals('dtFoo');
  });

  it('normalizeComponentAsName for directive should be equals "cpFoo"', () => {
    expect(Utils.normalizeComponentAsName('FooComponent')).to.be.equals('cpFoo');
  });

  it('normalizeRouteName should be equals "foo"', () => {
    expect(Utils.normalizeRouteName('FooController')).to.be.equals('foo');
  });

  it('normalizeServiceName should be equals "$fooService"', () => {
    expect(Utils.normalizeServiceName('FooService')).to.be.equals('$fooService');
  });

  it('normalizeDirectiveName should be equals "foo"', () => {
    expect(Utils.normalizeDirectiveName('FooDirective')).to.be.equals('foo');
  });

  it('normalizeInterceptorName should be equals "$fooInterceptor"', () => {
    expect(Utils.normalizeInterceptorName('FooInterceptor')).to.be.equals('$fooInterceptor');
  });

  it('normalizeConfigurationName should be equals "cfg.foo"', () => {
    expect(Utils.normalizeConfigurationName('FooConfiguration')).to.be.equals('cfg.foo');
  });
});

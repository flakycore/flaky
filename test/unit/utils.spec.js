import {Utils, LOWER, UPPER} from 'src/core/Utils';

describe('Utils', () => {
  it('isDefined should be equals "false"', () => {
    expect(Utils.isDefined(undefined)).to.be.not.ok;
  });

  it('isDefined should be equals "true"', () => {
    let b = 1;
    expect(Utils.isDefined(b)).to.be.ok;
  });

  it('isArray should be equals "false"', () => {
    expect(Utils.isArray(3)).to.be.not.ok;
  });

  it('isArray should be equals "true"', () => {
    expect(Utils.isArray([])).to.be.ok;
  });

  it('normalizeByPatternName should be equals "Foo"', () => {
    expect(Utils.normalizeByPatternName('FooTestNormalize', 'TestNormalize', false)).to.be.equals('Foo');
  });

  it('normalizeByPatternName should be equals "foo"', () => {
    expect(Utils.normalizeByPatternName('FooTestNormalize', 'TestNormalize', LOWER)).to.be.equals('foo');
  });

  it('normalizeByPatternName should be equals "Foo"', () => {
    expect(Utils.normalizeByPatternName('fooTestNormalize', 'TestNormalize', UPPER)).to.be.equals('Foo');
  });

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

  it('createInjectedFunction should be exists $inject', () => {
    let fn = Utils.createInjectedFunction(() => {}, ['foo', 'bar']);
    expect(fn.$inject).to.not.be.undefined;
    assert.deepEqual(fn.$inject, ['foo', 'bar']);
  });
});

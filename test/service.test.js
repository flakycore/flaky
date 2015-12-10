import {flaky} from 'src/flaky';
import {FooService} from './fixtures/FooService';

describe('Service', () => {
  let createdService;
  let serviceNormalizeName = '$fooService';

  beforeEach(module('flakyApp'));

  beforeEach(() => {
    createdService = angular.injector(['flakyApp']).get(serviceNormalizeName);
  });

  it('FooService should has normalize name', () => {
    expect(angular.injector(['flakyApp']).has(serviceNormalizeName)).to.be.true;
  });

  it('FooService should be exists in flaky', () => {
    expect(FooService).to.be.equals(flaky.module.services[0]);
  });

  it('FooService should be exists in angular', () => {
    expect(createdService).to.be.ok;
  });

  it('FooService field should be equal "foo"', () => {
    expect(createdService.obj.field).to.be.equals('foo');
  });

  it('FooService method should return "test"', () => {
    expect(createdService.method()).to.be.equals('method_foo');
  });
});

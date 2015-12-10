import {flaky} from 'flaky/flaky';
import {FooService} from './fixtures/FooService';

describe('FooService', () => {
  let createdService;
  let serviceNormalizeName = '$fooService';

  beforeEach(module('flakyApp'));

  beforeEach(() => {
    createdService = angular.injector(['flakyApp']).get(serviceNormalizeName);
  });

  it('should has normalize name', () => {
    expect(createdService).to.be.ok;
  });

  it('should be exists in flaky', () => {
    expect(FooService).to.be.equals(flaky.services[0]);
  });

  it('should be exists in angular', () => {
    expect(createdService).to.be.ok;
  });

  it('field should be equal "foo"', () => {
    expect(createdService.field).to.be.equals('foo');
  });

  it('method should return "test"', () => {
    expect(createdService.method()).to.be.equals('method_foo');
  });
});

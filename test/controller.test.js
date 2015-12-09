import angular from 'angular';
import 'angular-ui/ui-router';
import 'angular-mocks';
import {flaky} from 'flaky/flaky';
import {FooController} from './fixtures/FooController';

describe('FooController', () => {
  let createController;

  beforeEach(module('flakyApp'));

  beforeEach(inject(($controller) => {
    createController = function(name) {
      return $controller(name);
    };
  }));

  it('should be exists in flaky', () => {
    expect(FooController).to.be.equals(flaky.controllers[0]);
  });

  it('should be exists in angular', () => {
    let fooController = createController('FooController');
    expect(fooController).to.be.ok;
  });

  it('should be user.name equal "foo"', () => {
    let fooController = createController('FooController');
    expect(fooController.user.name).to.be.equals('foo');
  });
});

import {flaky} from 'src/flaky';
import {FooController} from './fixtures/FooController';

describe('Controller', () => {
  let createController;

  beforeEach(module('flakyApp'));

  beforeEach(inject(($controller) => {
    createController = function(name) {
      return $controller(name);
    };
  }));

  it('FooController should be exists in flaky', () => {
    expect(FooController).to.be.equals(flaky.module.controllers[0]);
  });

  it('FooController should be exists in angular', () => {
    let fooController = createController('FooController');
    expect(fooController).to.be.ok;
  });

  it('FooController should be user.name equal "foo"', () => {
    let fooController = createController('FooController');
    expect(fooController.user.name).to.be.equals('foo');
  });
});

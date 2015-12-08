import angular from 'angular';
import uiRouter from 'angular-ui/ui-router';
import {FooController} from './fixtures/FooController';
import {flaky} from 'flaky/flaky';

describe('FooController', () => {
  it('should be exists', () => {
    expect(FooController).to.be.equals(flaky.controllers[0]);
  });
});

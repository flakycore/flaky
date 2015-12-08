import angular from 'angular';
import {flaky} from 'flaky/flaky';
import {Application} from 'flaky/Application';

describe('Application', () => {
  let app = new Application('Flaky App');

  it('should be name Flaky App', () => {
    expect(app.name).to.be.equals('Flaky App');
  });
});

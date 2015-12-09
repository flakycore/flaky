import angular from 'angular';
import {flaky} from 'flaky/flaky';
import {Application} from 'flaky/Application';

describe('Application', () => {
  let app = new Application('flakyApp');

  it('should be name flakyApp', () => {
    expect(app.name).to.be.equals('flakyApp');
  });
});

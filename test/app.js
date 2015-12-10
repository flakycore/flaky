import angular from 'angular';
import 'angular-ui/ui-router';
import 'angular-mocks';
import {flaky} from 'flaky/flaky';
import {Application} from 'flaky/Application';
import {FooController} from './fixtures/FooController';

let app = new Application('flakyApp');
app.vendors = ['ui.router'];

app.addRoute('index', {
  url:'/index',
  template: '<index-template></index-template>'
});

flaky.bootstrap(app);

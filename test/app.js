import angular from 'angular';
import 'angular-ui/ui-router';
import 'angular-mocks';
import {flaky} from 'flaky/flaky';
import {Application} from 'flaky/Application';
import {FooController} from './fixtures/FooController';
import {FooComponent} from './fixtures/FooComponent';
import {FooService} from './fixtures/FooService';
import {FooDirective} from './fixtures/FooDirective';

let app = new Application('flakyApp');

app
  .setVendors(['ui.router'])
  .addRoute('foo', {
    url: '/foo',
    template: '<foo></foo>'
  })
;

flaky.bootstrap(app);

import angular from 'angular';
import 'angular-ui/ui-router';
import 'angular-mocks';
import {flaky} from 'src/flaky';
import {Application} from 'src/Application';
import {FooController} from './fixtures/FooController';
import {FooComponent} from './fixtures/FooComponent';
import {FooService} from './fixtures/FooService';
import {FooFilter, FooFilterService} from './fixtures/FooFilter';
import {FooDirective} from './fixtures/FooDirective';
import {FooResponseInterceptor, FooRequestInterceptor,
  FooResponseErrorInterceptor, FooRequestErrorInterceptor,
  FooInterceptorService} from './fixtures/FooInterceptors';

let app = new Application('flakyApp');

app
  .setVendors(['ui.router'])
  .addRoute('foo', {
    url: '/foo',
    template: '<foo></foo>'
  })
;

flaky.bootstrap(app);

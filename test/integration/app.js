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
import {HttpConfiguration} from './fixtures/HttpConfiguration';
import {StateConfiguration} from './fixtures/StateConfiguration';
import {LocationConfiguration} from './fixtures/LocationConfiguration';
import {FooResponseInterceptor, FooRequestInterceptor,
  FooResponseErrorInterceptor, FooRequestErrorInterceptor,
  FooInterceptorService} from './fixtures/FooInterceptors';

let httpConfiguration = new HttpConfiguration();
let stateConfiguration = new StateConfiguration();
let locationConfiguration = new LocationConfiguration();

let app = new Application('flakyApp');

app
  .setVendors(['ui.router'])
  .addConfiguration(httpConfiguration)
  .addConfiguration(stateConfiguration)
  .addConfiguration(locationConfiguration)
;

flaky.bootstrap(app);

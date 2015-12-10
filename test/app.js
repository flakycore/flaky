import angular from 'angular';
import 'angular-ui/ui-router';
import 'angular-mocks';
import {flaky} from 'flaky/flaky';
import {Application} from 'flaky/Application';
import {FooController} from './fixtures/FooController';
import {FooComponent} from './fixtures/FooComponent';
import {FooService} from './fixtures/FooService';
import {FooFilter} from './fixtures/FooFilter';

let app = new Application('flakyApp');

app.vendors = ['ui.router'];
flaky.bootstrap(app);

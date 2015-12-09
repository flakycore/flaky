import angular from 'angular';
import 'angular-ui/ui-router';
import 'angular-mocks';
import {flaky} from 'flaky/flaky';
import {Application} from 'flaky/Application';
import {FooController} from './fixtures/FooController';

let app = new Application('flakyApp');
app.vendors = ['ui.router'];
flaky.bootstrap(app);

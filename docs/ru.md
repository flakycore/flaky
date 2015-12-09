# Flaky

Обёртка позволяющая создавать приложения для AngularJS используя возможности ES2015.

## Установка

``` console
jspm install github:vlobchuk/flaky
```

## С чего начать?

``` javascript
import {flaky} from 'flaky/flaky';
import {Application} from 'flaky/Application';

let app = new Application('flakyApp');

flaky.bootstrap(app);
```

## Для разработчика

### Установка

``` console
npm install
jspm install
```

### Запуск тестов

``` console
npm test
```

## Зависимости

- AngularJS 1.4.7 или выше
- AngularJS UI-Router 0.2.15 или выше

## Автор

Vitaly Lobchuk <vn.lobchuk@gmail.com>

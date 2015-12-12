# Flaky

Обёртка позволяющая создавать приложения для AngularJS используя возможности ES2015.

# Установка

``` console
 jspm install flaky=github:flakycore/flaky@master
```

# С чего начать?

``` javascript
import {flaky} from 'flaky/flaky';
import {Application} from 'flaky/Application';

let app = new Application('flakyApp');

flaky.bootstrap(app);
```

# Для разработчика

## Установка

``` console
npm install
jspm install
```

## Запуск тестов

``` console
npm test
```

# Зависимости

- AngularJS 1.4.7 или выше
- AngularJS UI-Router 0.2.15 или выше

# Автор

Vitaly Lobchuk <vn.lobchuk@gmail.com>

# Помощь

__Ошибки и запросы__: можно отправить через трекер проекта.<br>
[![Issues](http://img.shields.io/github/issues/vlobchuk/flaky.svg)]( https://github.com/vlobchuk/flaky/issues )

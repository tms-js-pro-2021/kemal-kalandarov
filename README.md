# Создание нового приложения на React

## Репозиторий в GitHub

создайте репозиторий в GitHub

<br/>

## Копирование репозитория на локальную машину

cклонируйте репозиторий локально:

```
git clone %https или ssh ссылка на репозиторий%
```

откройте папку репозитория в VS Code

_также можно воспользоваться кнопкой `Clone Git Repository...` в VS Code_

<br/>

## Инициализация проекта

```
npm init
```

данная команда инициализирует проект, и позволяет интерактивно указать настройки

указываем `entry point: src/index.js`, остальное по дефолту (жмём Enter)

после опроса создается файл `package.json` с настройками, при необходимости их можно менять в любое время

<br/>

## Папки для кода и сборки проекта

создайте папку `src` и файл `index.js` в этой папке, для тестирования добавьте в файл:

```javascript
console.log("test");
```

<br/>

создайте папку `public` и файл `index.html` в этой папке

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>TMS %ФИО%</title>
  </head>

  <body>
    <div id="app"></div>
    <script src="/bundle.js"></script>
  </body>
</html>
```

<br/>

## Webpack/Babel

устанавите библиотеки webpack и babel командой:

```
npm install -D webpack webpack-cli @babel/core @babel/preset-env @babel/preset-react babel-loader
```

- [webpack](https://webpack.js.org) - инструмент предназначенный для сборки/упаковки всех файлов проекта в один файл (bundle.js), а так же для запуска dev server-а на localhost.
- [babel](https://babeljs.io) - [транспайлер](https://ru.wikipedia.org/wiki/%D0%A2%D1%80%D0%B0%D0%BD%D1%81%D0%BF%D0%B0%D0%B9%D0%BB%D0%B5%D1%80) кода, написанного на современной версии JS, в более старую версию кода, понятную браузерами. Так же необходим для транспиляции синтаксиса JSX (html in js) в обычный JS.

_обратите внимание на флаг `-D` - установить в [devDependencies](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#devdependencies) вместо [dependencies](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#dependencies)_

<br/>

создайте файл `.gitignore` в корне проекта:

```
/node_modules
```

<br/>

создайте файл `webpack.config.js` в корне проекта:

```javascript
const path = require("path");

module.exports = {
  output: {
    path: path.join(__dirname, "/public"),
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "/public"),
    port: 3000,
    watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
```

<br/>

создайте файл `babel.config.js` в корне проекта:

```javascript
module.exports = {
  presets: ["@babel/preset-react", "@babel/preset-env"],
};
```

<br/>

добавьте в `package.json` раздел `scripts`:

```json
"start": "webpack serve --mode development",
"build": "webpack build --mode production",
```

<br/>

запустите приложение локально:

```
npm start
```

_должен запуститься режим разработки_

_чтобы выйти из режима разработки в терминале - Ctrl+C_

<br/>

запустите сборку приложения:

```
npm run build
```

_должен создаться файл `bundle.js` в папке `public`_

добавьте в `.gitignore` строку:

```
/public/*.js
```

_`.js` файлы в папке `public` не должны храниться в GitHub-е_

## Jest

устанавите библиотеку для тестирования [jest](https://jestjs.io):

```
npm install -D jest
```

<br/>

создайте файл `jest.config.js` в корне проекта:

```javascript
module.exports = {
  testEnvironment: "jsdom",
};
```

<br/>

добавьте в `.gitignore` строку:

```
/coverage
```

<br/>

создайте файл `index.test.js` в папке `src`:
```javascript
describe("index", () => {
  it("should pass", () => {
    expect(true).toBe(true);
  });
});
```

<br/>

добавьте в `package.json` раздел `scripts`:
```json
"test": "jest --coverage",
"test:watch": "jest --watch",
```

<br/>

запустите тестирование:

```
npm run test
```

<br/>

запустите тестирование в режиме наблюдения за изменениями:
```
npm run test:watch
```
_чтобы выйти из наблюдения за изменениями в терминале - Ctrl+C_

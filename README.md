# Aplikacja dla trenera - RunAnd

Projekt oparty jest o szkielet aplikacji AngularJS - angular-seed [AngularJS](http://angularjs.org/).
Dzięki czemu w łatwy sposób można połączyć naszą aplikację z bootstrapem oraz bowerem.

## Jak zacząć

Aby uruchomić aplikację wystarczy pobrać projekt i w przeglądarce otworzyć plik app/index.html. Należy także w tym pliku wskazać ścieżki do dodatkowych zależności, np. do bootstrapa lub jQuery.

Można także projekt pobrać i zainstalować node.js, aby uruchomić npm-a, który uruchomi bowera. Wtedy zależności pobiorą się automatycznie.

### Utworzenie nowej aplikacji przy pomocy angular-seed

Sklonuj angular-seed z repozytorium używajac [git][git]:

```
git clone https://github.com/angular/angular-seed.git
cd angular-seed
```

### Zainstaluj zależności

```
npm install
```

W tle uruchomi się polecenie `bower install`. Powstaną katalogi:

* `node_modules` - pakiety npm-a
* `app/bower_components` - zawiera zależności pobrane przez bowera

Folder `bower_components` ustawiony jest w pliku `.bowerrc`.

### Uruchom aplikację

```
npm start
```

## Struktura katalogów

    app/                --> all of the files to be used in production
      css/              --> css files
        app.css         --> default stylesheet
      img/              --> image files
      index.html        --> app layout file (the main html template file of the app)
      index-async.html  --> just like index.html, but loads js files asynchronously
      js/               --> javascript files
        app.js          --> application
        controllers.js  --> application controllers
        directives.js   --> application directives
        filters.js      --> custom angular filters
        services.js     --> custom angular services
      partials/             --> angular view partials (partial html templates)
        partial1.html
        partial2.html

    test/               --> test config and source files
      protractor-conf.js    --> config file for running e2e tests with Protractor
      e2e/                  --> end-to-end specs
        scenarios.js
      karma.conf.js         --> config file for running unit tests with Karma
      unit/                 --> unit level specs/tests
        controllersSpec.js      --> specs for controllers
        directivessSpec.js      --> specs for directives
        filtersSpec.js          --> specs for filters
        servicesSpec.js         --> specs for services


## Testowanie

```
npm test
```

```
npm run test-single-run
```

## Aktualizacja Angular

```
npm update
```

```
bower update
```

## Linki

[angular]: http://angularjs.org/
[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://pivotal.github.com/jasmine/
[karma]: http://karma-runner.github.io
[travis]: https://travis-ci.org/
[http-server]: https://github.com/nodeapps/http-server

# Opsonion

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Deleting all users from Firebase authentication console

Browse to the Firebase authentication console page, and then run the following in Developer Tools, on the Console tab. 

```js
var intervalId;

var clearFunction = function() {
  if ($('[aria-label="Delete account"]').size() == 0) {
    console.log("interval cleared")
    clearInterval(intervalId)
    return
  }
  $('[aria-label="Delete account"]')[0].click();
  setTimeout(function () {
     $(".md-raised:contains(Delete)").click()
  }, 1000);
};

intervalId = setInterval(clearFunction, 3000)
```
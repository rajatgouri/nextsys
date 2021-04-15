# Nextsys

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.8.

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

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## create module 
ng g m module_name

## create component
ng g c module_name/component-name

## create service
ng g s services/services_name

App.ts is a main file to include all modules HomeModule, AuthModule 

app-routing.module.ts is a file to include these modules path or url

Inside HomeModule and AuthModule further routing are done using Router Module

## Imports

RouterModule - Routing
ReactiveFormsModule - Forms with reactive form approch 
HttpCLientModule - server side module 
HttpClient - send request to server
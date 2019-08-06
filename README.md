# TallyClone

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.4.

## Get Started

#### Step Up Firebase Related Stuff:-

- Make a file src/environments/firebase.ts and add your firebase credentials in that file:-

  `export const firebase = {your credentials}`

#### Setup Firebase Functions and Firestore rules:-

- Install [firebase cli client](https://firebase.google.com/docs/cli) and login with your account.

- Make Your Firebase Project in firebase console.

- Make a file firebase/.firebaserc and add the following and replace your-project-name with your project name:-

  `{"projects": {"default": "your-project-name"}}`

- Deploy Your Firebase Functions and Firestore Rules.

  `firebase deploy`

#### Test Your Project :-

- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

##### And You are done.

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

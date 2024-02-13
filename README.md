# Telecom Service SPA

## Introduction
This project is an assessment to demonstrate my understanding and skills in Angular, Bootstrap, and NgRx. 
The main functionality includes:
- display all phone numbers
- filter phone numbers by customer
- add a new phone number to a customer’s account
- activate a phone number

## Prerequisites
- [Angular CLI](https://github.com/angular/angular-cli) version 17.1.3
- ng-bootstrap version 16
- ngrx component-store version 17.1.0

## Hosting
- Azure Static Web App: https://jolly-sea-0259a8c00.4.azurestaticapps.net/

## Assumptions
- No adding, updating, and deleting actions for Customer
- Deleting and inactiving a phone number operations are not included in the system
- No loading spinner added while pending API completion

## Development
- Implement component-store to contain major business logic
- HTML template is mainly for visualise the data from component
- Component be the bridge between template and component-store

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

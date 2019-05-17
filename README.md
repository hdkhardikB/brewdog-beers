![Brewdog Beers](https://www.brewdog.com/media/logo/default/brewdog-logo.png)
# Brewdog Beers

This is a sample application to list and show details of beers made using React, Node and Typescript.

To use the best developing pattern, application is tweaked to use the Typescript. Typescript provides the best development experience to developer. It provides rich environment in IDE such as auto suggestion, common error spotting, classes, interface and strict type checking. Application used Jest and enzyme for unit testing. Also it features server side rendering, which is most efficient way of optimising SEO in single page applications.

### Prerequisites :white_check_mark:

You will need Yarn or NPM installed to run this application in a local environment for development or testing purposes.

* [Homebrew](https://brew.sh/) - Application install tool for Mac / Linux (can install all of the below for you)
* [Docker](https://www.docker.com/products/docker-desktop) - Containerisation tool used to package the application for production
* [Node](https://nodejs.org/en/download/) - Localised Javascript engine 
* [NPM](https://www.npmjs.com/get-npm) - Package tool for downloading application dependancies
* [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) - Alternative to NPM

### Installing :information_source:

`npm install` or `yarn`

### Tests :mag:

`yarn test:unit`
> will run a once-off set of unit tests for the React components

### Utilities :wrench:

`yarn util:clean`
> can be ran to remove all files in the `/dist` directory

### Applications :desktop:

`yarn run:dev`
> will run a local server on http://localhost:8080 using webpack-dev-sever

`yarn run:production`
> starts a production version of the application including server-side rendering

## Build :package:

`yarn build:production`
> will bundle all required files into a `/dist` directory. Runs both the `build:client`, and `build:server` processes

`yarn build:client`
> compiles the client-side Javascript for a production server

`yarn build:server`
> compiles the server-side Javascript for a production server



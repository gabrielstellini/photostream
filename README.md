# Ng-PhotoStream

This workspace has been generated by [Nx, a Smart, fast and extensible build system.](https://nx.dev)

## Quick Start & Documentation

- <b>Node v16.19.0</b> was used during development
- Install dependencies using `npm install`
- The Angular app can be found in apps/frontend/ and the e2e tests can be found in apps/frontend-e2e
- This repo uses the `json-server` package to emulate a backend API.

### Running the project

- Run `npm run start:all` to start both the mock server and the client.
- Run `npm run test:all` to run all unit tests.
- Run `npm run e2e:dev` to run open the cypress runner. This starts the mock backend server

### Image infinite scroll

- Please throttle the connection to slow 3G in the dev tools to see the infinite scroll in action (after the app has
  loaded).
- You should see a spinner until the app loads, and spinners on each of the images until those load in
- This is because the lazy loading is designed to happen at a distance threshold from the bottom of the page - this way
  the users may never see a spinner (provided they have a fast connection)


Demo:
https://user-images.githubusercontent.com/16836689/235340201-5cd04d51-4628-42c1-b8e0-a0637363a3d4.mp4

### Development

- Run ` nx g c photoContainer --project=frontend --skip-import --standalone --style=scss` to create a component
- Run ` nx g @nrwl/angular:lib feature-x --standalone --routing --lazy --parent=apps/frontend/src/app/app.routes.ts` to
  create a new feature library

### Future plans

- Replace json-server with the nestjs backend (for the time being, this was only installed)
- Move the lib components into their own lib project
- Add Storybook
- Dockerize

## Remote caching

Run `npx nx connect-to-nx-cloud` to enable [remote caching](https://nx.app) and make CI faster.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.


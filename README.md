# DialogueV2-FE

DialogueV2 is a version 2 of Dialogue project and is supposed to be a upgrade over its previous version.

The project itself is not a commercial project and is solely worked upon for skill development and hands-on practice.

This repository holds Frontend codebase for the overall project.

More details about the project can be found on this <a href="https://github.com/prashantsihag03/dialogueV2">link</a> along with Backend code base.

## Demo Videos

https://github.com/prashantsihag03/dialogueV2-fe/assets/23043779/a50273f5-48b2-493f-880f-745033045ebf



## Start Just this App Locally

Note: Websocket based features will not be available when running this app without backend service. You can test the whole app through the backend repo and isntructions to do so are available .

- Start the json-server
  > npm run sjs
- In a different terminal, start the app
  > npm install; npm run start;
- Visit http://localhost:8080

## Build just this app

> npm run build;

## Build and deploy to the backend service locally

- Clone backend repository first by heading over <a href="https://github.com/prashantsihag03/dialogueV2">here</a>.
- Copy full absolute path to `/public` inside the backend repository.
- Paste this copied absolute path and paste it as a value to `BE_PUBLIC_PATH` variable inside `/script/copuBuildFilesToBackend.sh` file inside frontend repository.
- Update the full absolute path to `build` directory for the frontend repository as well inside the `/script/copuBuildFilesToBackend.sh` file inside frontend repository.
- Now running below command will build frontend distribution and copy-paste these into backend services public directory from where backend services will be able to serve it locally.
  > npm run devBuild;

## Testing

NOTE: tests aren't included yet.

> npm run test;

## Local Storybook

> npm run storybook;

## Build Storybook

> npm run build-storybook;

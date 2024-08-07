# DialogueV2-FE

DialogueV2 is a version 2 of Dialogue project and is supposed to be a upgrade over its previous version.

The project itself is not a commercial project and is solely worked upon for skill development and hands-on practice.

This repository holds Frontend codebase for the overall project.

More details about the project can be found on this <a href="https://github.com/prashantsihag03/dialogueV2">link</a> along with Backend code base.

## Demo Videos
NOTE: Collapse video by clicking on video title
<details>
  <summary><h3> 🎥 - Guided Tour </h3></summary>
  <video src="https://github.com/prashantsihag03/dialogueV2-fe/assets/23043779/a50273f5-48b2-493f-880f-745033045ebf" controls="controls" style="max-width: 730px;"></video>
  <video src="https://github.com/prashantsihag03/dialogueV2-fe/assets/23043779/662b972f-bba0-46e0-ade1-26f8dbe8dfdb" controls="controls" style="max-width: 730px;"></video>
</details>

## Start Just this App Locally
_Note: Websocket based features will not be available when running this app without backend service. You can test the whole app through the backend repo and isntructions to do so are available._
- Start the json-server <code>npm run sjs</code>
- In a different terminal, start the app <code>npm install; npm run start;</code>
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

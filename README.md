# BTC Client [![Build and Deploy React App to S3 Bucket](https://github.com/keremnalbant/btc-client/actions/workflows/prod.yaml/badge.svg)](https://github.com/keremnalbant/btc-client/actions/workflows/prod.yaml)

[See Live](https://app.globalfuturepoland.com)

## Demo Video
https://github.com/keremnalbant/btc-server/assets/43813768/f5e875a9-3e10-439a-be41-c2fb4c3d8488

## System Design and More
[See Whimsical](https://whimsical.com/btc-system-design-MqAKNkaZWDkYBkHSjAyPv1)

## Functionalities
- Real-time notifications and data polling with Websockets (Socket.io)
- Users can continue to make guesses even they close and reopen their browsers, even more server is restarted, unless they clean their cookies
- Loginless persisted data with cookies
- Custom hooks, contexts, and services for socket/event/state management
- Strongly type safe
- Coincap API
- Toast messages on disconnect, connect, result of the game (you won, you lost etc.)
- TailwindCSS
- ESLint
- Prettier
- TypeScript
- AWS Services used for deployment, CI/CD with GitHub Actions
- CloudFront used for distribution, AWS S3 used for hosting, Domain/DNS management achieved via GoDaddy

## Available Scripts

Yarn is used on this project, so I suggest you use yarn.
You can install yarn globally with: `npm install --global yarn`

After installing yarn run `yarn install` to install the dependencies.

### `yarn start`

Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### `yarn lint:fix`

Runs the ESLint linter on the project and if possible fixes the lint errors according to your config in .eslintrc.json file.

### `yarn format`

Runs the Prettier formatter on the project and format all the files according to your config in .prettierrc.json file.

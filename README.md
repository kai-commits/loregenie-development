# Getting Started

## Firebase

- Create Firebase project
- Generate your Firebase Admin SDK Private Key
- Store the Private Key JSON file in the project
- Set the env ```GOOGLE_SERVICE_ACCOUNT``` to the file path of the key. For example, ```GOOGLE_SERVICE_ACCOUNT='./private-key.json'```
- (Make sure your private key is in the .gitignore if the project is public)

## Firebase Local Emulator

- run: ```npm install -g firebase-tools```
- run: ```firebase init```
- select Emulators
- select Storage Emulator and Firestore Emulator
- add storage and firestore ports into the env. By default, the values are:
  - ```FIRESTORE_EMULATOR_HOST='localhost:8080'```
  - ```FIREBASE_STORAGE_EMULATOR_HOST='localhost:9199'```
- run: ```firebase emulators:start``` OR run firebase emulator with persistent data:
  - create ```exported-firebase-data``` folder in root directory
  - run: ```npm run emulator```

## Discord and Twitch SSO

- Create Discord project
- Save redirect URI as ```http://localhost:3000/api/auth/callback/discord```
- Copy ```CLIENT ID``` and ```CLIENT SECRET``` into env
- repeat steps above for Twitch

## Environment Variables

- create a ```.env.local``` file
- env file template example:
```
GOOGLE_SERVICE_ACCOUNT='./private-key.json'
DISCORD_CLIENT_ID='discord-client-id'
DISCORD_CLIENT_SECRET='dicord-client-secret'
TWITCH_CLIENT_ID='twitch-client-id'
TWITCH_CLIENT_SECRET='twitch-client-secret'
FIRESTORE_EMULATOR_HOST='localhost:8080'
FIREBASE_STORAGE_EMULATOR_HOST='localhost:9199'
```

## Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


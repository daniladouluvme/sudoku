# Sudoku

Sudoku web application. You can solve Sudoku alone or together with a friend.

## Environment

[Bun](https://bun.sh) and [Mongodb](https://www.mongodb.com) are required to run the application.
To launch the application, is required.

## Scripts

A mono repository is used to organize the code. [NX](https://nx.dev) is used to work with the repository.

### Development

1. **nx scripts**
   1. **bunx nx run client:dev** - The script runs the frontend in development mode
   1. **bunx nx run server:dev** - The script runs the backend in development mode
1. **bun scripts**
   1. **bun run dev:app** - The script for launching the frontend and backend
   1. **bun run changelog** - The script for updating the changelog file

### Production

1. **nx scripts**
   1. **bunx nx run client:build** - The script builds the frontend
   1. **bunx nx run client:preview** - The script runs the frontend in preview mode
   1. **bunx nx run server:build** - The script builds the backend
   1. **bunx nx run server:preview** - The script runs the backend in preview mode
   1. **bunx nx run server:copy-config** - The script copies the config template to the build
1. **bun scripts**
   1. **build:app** - The script creates an application build

## Config

<pre>{
  "server": {
    "port": 80
  },
  "origins": [],
  "database": {
    "host": "",
    "user": "",
    "password": ""
  },
  "jwtSecretKey": "",
  "email": {
    "host": "",
    "port": 587,
    "secure": false,
    "auth": {
      "user": "",
      "pass": ""
    },
    "logger": true,
    "debug": true
  }
}
</pre>

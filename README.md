# Pulse-Roshambo

A Web App for Tier 3 members to roshambo over fixing bugs && production incidents


![Alt Text](https://media0.giphy.com/media/3o6Zt1ogQsYg0rVgbK/giphy.gif)



## Table of Contents
- [Running Locally](#run-locally)
- [Deployment](#deployment)
- [Features](#features)
- [Contributing](#contributing)
- [Contributors](#contributors)

______________________________________________

## Run Locally

Clone repo

```sh
$ git clone https://github.com/ianarsenault/Pulse-Roshambo.git
```

To run client

```sh
$ cd client
$ npm install
$ npm run dev
```

[Install MongoDB](https://treehouse.github.io/installation-guides/mac/mongo-mac.html)

To run MongoDB

```sh
$ mongod
```


To run server

```sh
$ cd server
$ npm install
$ npm run dev
```

For PC

```sh
$ npm run dev:pc
```

_____________________________________________

## Deployment
There is a `deploy.sh` script in the root of the repo that will:
 - Pull the latest from git 
		- (We may want to add an env variable that we can use to specify a branch in the future)
 - Run npm install and build the client
 - Run npm install for the server
 
 You will also want to install `forever` to run the server  
 ```bash
 sudo npm install -g forever
 forever start ./server/bin/www
```

**Nginx config**
Along with your other normal server config, you will want to point the server root at the client/dist directory:

```
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name roshambo.silucions.com;
    root /home/forge/roshambo.silucions.com/client/dist;
    ...
```

Setup a proxy for the api:
```
    location /api {
        proxy_pass http://localhost:8081;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```
_____________________________________________


## Features

Version 1.0 Features

- Ability to add new players
- Add profile images (small images only! *dab*)
- CRUD Capabilities for players
- Game Logs
- Player Profiles
- Roshambo!


-----------------------------------------------

## Contributing

Open an issue or a pull request to suggest changes or additions.


## Contributors

|  [![ianarsenault](https://avatars2.githubusercontent.com/u/12011826?s=80&v=4&s=40)](https://github.com/ianarsenault) | [![jaydeluca](https://avatars0.githubusercontent.com/u/7630696?s=80&v=4)](https://github.com/jaydeluca) | [![j-arsenault](https://avatars0.githubusercontent.com/u/11837811?s=80&v=4)](https://github.com/j-arsenault)  |  [![adigitalmonk](https://i.imgur.com/X1vPlj1.png?1)](https://github.com/adigitalmonk)  | [![jkeys](https://avatars1.githubusercontent.com/u/11370032?s=80&v=4)](https://github.com/jkys)  |
| :--:|:--:|:--: | :--: | :--: |
|  [ianarsenault](https://github.com/ianarsenault) | [jaydeluca](https://github.com/jaydeluca) | [j-arsenault](https://github.com/j-arsenault)  |  [adigitalmonk](https://github.com/adigitalmonk)  | [jkeys](https://github.com/jkys)  |

# Pulse-Roshambo

[![Build Status](https://travis-ci.org/ianarsenault/Pulse-Roshambo.svg?branch=master)](https://travis-ci.org/ianarsenault/Pulse-Roshambo)

A Web App for Tier 3 members to roshambo over fixing bugs && production incidents


![Alt Text](https://media0.giphy.com/media/3o6Zt1ogQsYg0rVgbK/giphy.gif)



## Table of Contents
- [Running Locally](#run-locally)
- [Deployment](#deployment)
- [Changelog](#changelog)
- [Contributing](#contributing)
- [Contributors](#contributors)

______________________________________________

## Run Locally

#### Clone repo

```sh
git clone https://github.com/ianarsenault/Pulse-Roshambo.git
```

#### Run client

```sh
cd client
npm install
npm run dev
```

#### To run server locally:  

First [Install MongoDB](https://treehouse.github.io/installation-guides/mac/mongo-mac.html) if not already installed  

To run it:  
```sh
mongod
```

Next you will need to configure an env file
```bash
cp server/example.env server/.env
```
  
Open the newly created .env file and update the environment:
```
NODE_ENV="dev"
```

Now you're ready to run the server:  
```sh
cd server
npm install
npm run dev
```

#### For PC

```sh
npm run dev:pc
```

_____________________________________________

## Deployment

Follow these instructions to get mongodb setup on ubuntu
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/  
  
 You will need to first install `forever` to run the server
```bash
sudo npm install -g forever
```

The command to manually run the server using `forever`:  
```bash
forever start ./server/bin/www
```

### Deploy Script
There is a `deploy.sh` script in the root of the repo that will run the build for you and start the server.

In order to run the script you need to ensure it is executable:
```
chmod +x deploy.sh
```

What the Deploy Script does:  
 - Pull the latest from git 
		- (We may want to add an env variable that we can use to specify a branch in the future)
 - Run npm install and build the client
 - Create the directory for file uploads
 - Run npm install for the server
 - Trigger the `forever` command to keep the server running
 

### Nginx config  
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

## Changelog
For changelogs, check out the [Releases section of Roshmabo](https://github.com/ianarsenault/Pulse-Roshambo/releases) or the [CHANGELOG.md](https://github.com/ianarsenault/Pulse-Roshambo/blob/master/CHANGELOG.md).

-----------------------------------------------

## Contributing

Open an issue or a pull request to suggest changes or additions.


## Contributors

|  [![ianarsenault](https://avatars2.githubusercontent.com/u/12011826?s=80&v=4&s=40)](https://github.com/ianarsenault) | [![jaydeluca](https://avatars0.githubusercontent.com/u/7630696?s=80&v=4)](https://github.com/jaydeluca) | [![j-arsenault](https://avatars0.githubusercontent.com/u/11837811?s=80&v=4)](https://github.com/j-arsenault)  |  [![adigitalmonk](https://i.imgur.com/X1vPlj1.png?1)](https://github.com/adigitalmonk)  | [![jkeys](https://avatars1.githubusercontent.com/u/11370032?s=80&v=4)](https://github.com/jkys)  | [![QuestionMarks](https://i.imgur.com/F1ndLtG.png?1)](https://github.com/QuestionMarks)  |
| :--:|:--:|:--: | :--: | :--: | :--: |
|  [ianarsenault](https://github.com/ianarsenault) | [jaydeluca](https://github.com/jaydeluca) | [j-arsenault](https://github.com/j-arsenault)  |  [adigitalmonk](https://github.com/adigitalmonk)  | [jkeys](https://github.com/jkys)  | [QuestionMarks](https://github.com/QuestionMarks)  |

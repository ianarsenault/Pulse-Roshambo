#!/usr/bin/env bash

git pull
cd client
npm install --production
npm run build
mkdir ./dist/static/uploads
cd ..
cd server
cp example.env .env
npm install --production
forever stopall
forever start ./bin/www

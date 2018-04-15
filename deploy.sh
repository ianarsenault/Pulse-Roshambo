#!/usr/bin/env bash

git pull
cd client
npm install
npm run build
cd ..
cd server
npm install

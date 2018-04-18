#!/usr/bin/env bash
# Deployment with zero downtime
# By default keeps 2 last deployments in KEEP_DEPLOYMENTS_DIR and current deployment

# Project domain
PROJECT_NAME=roshambo.silucions.com
# Project directory
PROJECT_DIR=/home/forge/roshambo.silucions.com

# Deployments directory
KEEP_DEPLOYMENTS_DIR=/home/forge/deploy
KEEP_DEPLOYMENTS=2

DEPLOY_DIR_NAME=$(date +'%d%m%Y_%H%M%S')
DEPLOY_DIR_PROJECT=${KEEP_DEPLOYMENTS_DIR}/${PROJECT_NAME}
DEPLOY_DIR=${DEPLOY_DIR_PROJECT}/${DEPLOY_DIR_NAME}

echo "Initialize deployment directory '"${DEPLOY_DIR}"'"
[ -d ${DEPLOY_DIR} ] || mkdir -p ${DEPLOY_DIR}

echo "Copying '"${PROJECT_DIR}/"' to '"${DEPLOY_DIR}"'"
rsync -a $PROJECT_DIR/ $DEPLOY_DIR


echo "Execute commands in deployment directory"
cd ${DEPLOY_DIR}

# Application Build
git pull
mkdir tmp
cp -r ./client/dist/static/uploads tmp
cd client
npm install --production
npm run build
mkdir ./dist/static/uploads
cd ..
cp -r tmp ./client/dist/static/uploads
rm -r tmp
cd server
cp example.env .env
npm install --production
forever stopall
forever start ./bin/www

# Atomic, zero downtime
echo "Update symlink '"${DEPLOY_DIR}"' to '"${PROJECT_DIR}.tmp"'"
ln -s $DEPLOY_DIR ${PROJECT_DIR}.tmp

# Remove current project directory if not symlink
if [ ! -h $PROJECT_DIR ]; then
  rm -rf $PROJECT_DIR
fi

echo "Update symlink '"${DEPLOY_DIR}.tmp"' to '"${PROJECT_DIR}"'"
mv -Tf $PROJECT_DIR.tmp $PROJECT_DIR

echo "Clear old deployments in '"${DEPLOY_DIR_PROJECT}" keep last '"${KEEP_DEPLOYMENTS}"'"
cd ${DEPLOY_DIR_PROJECT}
rm -rf $(ls ${DEPLOY_DIR_PROJECT} -t | grep -v ${DEPLOY_DIR_NAME} | tail -n +$((KEEP_DEPLOYMENTS+1)))
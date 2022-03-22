#!/bin/bash

if [ -d "$1" ];
then
    cd "$1"
    echo "Pulling Repository"
    git checkout main
    git pull origin main
    echo "Restarting docker-compose"
    sudo docker-compose down
    sudo docker-compose build --force-rm --no-cache
    sudo docker-compose up -d
else
    git clone git@gitlab.com:prin-code/$1.git
    cd "$1"
    echo "Starting up container"
    sudo docker-compose up --build -d
fi

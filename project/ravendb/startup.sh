#!/bin/bash

while getopts bd opt; do
    case $opt in
        b) BUILD=true;;
        d) DET=true;;
    esac
done

if [[ $BUILD ]]; then
    if [[ -n $(docker ps -aq) ]]; then
        echo "Deleting previous containers"
        docker rm -vf $(docker ps -aq)
    fi

    sudo rm -rf ../data

    docker-compose build

    if [[ -n $(docker image ls -f dangling=true) ]]; then
        echo "Removing dangling images"
        docker rmi -f $(docker image ls -f dangling=true)
    fi
fi

if [[ $DET ]]; then
    docker-compose up -d
else
    docker-compose up
fi
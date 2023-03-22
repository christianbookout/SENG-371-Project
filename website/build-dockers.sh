#!/bin/bash

NEWS_FLASK = "news_flask"
NEWS_NODE = "news_node"

if [ $(docker ps -a -q -f name=$NEWS_FLASK) ]; then
    docker stop $NEWS_FLASK
    docker rm $NEWS_FLASK
fi

if [ $(docker ps -a -q -f name=$NEWS_NODE) ]; then
    docker stop $NEWS_NODE
    docker rm $NEWS_NODE
fi

# building flask docker image and running it
docker image build -t $NEWS_FLASK -f Dockerfile.flask .
docker run -p 5000:5000 -d $NEWS_FLASK

# building node docker image and running it
docker image build -t $NEWS_NODE -f Dockerfile.node .
docker run -p 3000:3000 $NEWS_NODE
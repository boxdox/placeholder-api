#! /bin/bash

source .env

docker build -t boxdox/placeholder-api:${TAG} .

unset PORT
unset TAG
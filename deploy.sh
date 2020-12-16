#!/bin/bash

git pull
npm build
nohup serve -s -l 8080 dist/ &
lsof -i :80



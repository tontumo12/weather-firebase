#!/bin/bash

git pull
npm run build
nohup serve -s -l 8080 dist/ &
lsof -i :80



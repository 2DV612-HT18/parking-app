#!/usr/bin/env bash

export DOLLAR='$'
envsubst < /etc/nginx/nginx.template > /etc/nginx/nginx.conf
nginx -g "daemon off;"

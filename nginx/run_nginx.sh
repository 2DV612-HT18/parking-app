#!/usr/bin/env bash

export DOLLAR='$'
envsubst < /etc/nginx/nginx.template > /etc/nginx/nginx.conf
envsubst < /etc/nginx/sites-enabled/backend.template > /etc/nginx/sites-enabled/backend.conf
envsubst < /etc/nginx/sites-enabled/frontend.template > /etc/nginx/sites-enabled/frontend.conf
nginx -g "daemon off;"

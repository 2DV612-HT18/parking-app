#!/usr/bin/env bash

# Extract the cert files to /etc/nginx/certs.
tar xvf /etc/nginx/backup.tar >> /dev/null

export DOLLAR='$'
envsubst < /etc/nginx/nginx.template > /etc/nginx/nginx.conf
envsubst < /etc/nginx/sites-enabled/backend.template > /etc/nginx/sites-enabled/backend.conf
envsubst < /etc/nginx/sites-enabled/frontend.template > /etc/nginx/sites-enabled/frontend.conf
nginx -g "daemon off;"

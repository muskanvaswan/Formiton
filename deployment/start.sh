#!/usr/bin/env sh

set -x
set -o errexit
set -o nounset

/app/node_modules/.bin/next start --port 80

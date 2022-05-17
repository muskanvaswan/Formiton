#!/usr/bin/env sh

set -x
set -o errexit
set -o nounset


if [ -f .env ]; then
    . ./.env
fi

if [ -z "${DATABASE_URL}" ]; then
    echo '"DATABASE_URL" environment variable does not exist'
    exit 1
fi

/app/node_modules/.bin/prisma migrate deploy
/app/node_modules/.bin/next start --port 80

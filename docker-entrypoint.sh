#!/bin/sh
set -eu

# Named volume seeding can leave the uploads mountpoint root-owned.
# Fix it, then drop privileges.
if [ "$(id -u)" = "0" ]; then
  mkdir -p /app/public/uploads /app/.tmp
  chown node:node /app/public/uploads /app/.tmp
  exec gosu node "$@"
fi

exec "$@"

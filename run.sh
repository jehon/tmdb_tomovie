#!/usr/bin/env bash

set -o errexit

# shellcheck source=/usr/bin/jh-lib
. jh-lib

jh-npm-update-if-necessary "$JH_SWD"

JH_TMDB_KEY="$( jh-config get "JH_TMDB_KEY" )"
export JH_TMDB_KEY

if [ -z "$JH_TMDB_KEY" ]; then
    jh_fatal "No JH_TMDB_KEY found"
fi

"$JH_SWD/main.js" "$@"

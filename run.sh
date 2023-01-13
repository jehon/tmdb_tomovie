#!/usr/bin/env bash

set -o errexit

SWD="$(realpath --physical "$(dirname "${BASH_SOURCE[0]}")")"

jh-npm-update-if-necessary "$SWD"

# JH_TMDB_KEY="$( jh-config get "JH_TMDB_KEY" )"
# export JH_TMDB_KEY

# if [ -z "$JH_TMDB_KEY" ]; then
#     jh_fatal "No JH_TMDB_KEY found"
# fi

"$SWD/main.js" "$@"

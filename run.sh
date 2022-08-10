#!/usr/bin/env bash

set -o errexit

# shellcheck source=/usr/bin/jh-lib
. jh-lib

jh-npm-update-if-necessary "$JH_SWD"

"$JH_SWD/main.js" "$@"

#!/usr/bin/env bash

set -o errexit

# shellcheck source=/usr/bin/jh-lib
. jh-lib

TMP="$( realpath "$JH_SWD"/../tmp )"
mkdir -p "$TMP"

# https://superuser.com/a/1003429/287025

ffmpeg -y -f lavfi \
    -i anullsrc -loop 1 \
    -f image2 -i "$JH_SWD"/create.jpg \
    -r 30 -t 10 -pix_fmt yuvj420p -map 0:a -map 1:v \
    "$TMP"/video.mkv

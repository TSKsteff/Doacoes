#!/usr/bin/env bash
DCKR=$(which podman docker | head -n 1)

$DCKR run --rm -it -p 3000:3000 extbackend:latest

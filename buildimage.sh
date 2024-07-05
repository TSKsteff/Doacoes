#!/usr/bin/env bash
DCKR=$(which podman docker | head -n 1)

$DCKR build -t extbackend:latest .


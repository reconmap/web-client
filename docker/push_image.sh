#!/usr/bin/env bash

echo "$QUAY_ROBOT_TOKEN" | docker login -u "$QUAY_ROBOT_USERNAME" --password-stdin quay.io

RECONMAP_APP_STAGE=dev make build push
RECONMAP_APP_STAGE=prod make build push


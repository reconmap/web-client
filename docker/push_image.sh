#!/usr/bin/env bash

echo "$QUAY_ROBOT_TOKEN" | docker login -u "$QUAY_ROBOT_USERNAME" --password-stdin quay.io
docker push quay.io/reconmap/web-client


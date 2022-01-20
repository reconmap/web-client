SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c
.ONESHELL:
.DELETE_ON_ERROR:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

ENV_FILE_NAME ?= environment.local.js
DOCKER_IMAGE_NAME = quay.io/reconmap/web-client
DOCKER_CONTAINER_NAME = reconmap-web-client
DOCKER_DEV_TAG = reconmap/web-client:dev

HOST_USER_ID=$(shell id -u)
HOST_GROUP_ID=$(shell id -g)
CONTAINER_UID_GID=$(HOST_USER_ID):$(HOST_GROUP_ID)

ifdef TRAVIS_BRANCH
GIT_BRANCH_NAME = $(TRAVIS_BRANCH)
else
GIT_BRANCH_NAME = $(shell git rev-parse --abbrev-ref HEAD)
endif

GIT_COMMIT_HASH = $(shell git rev-parse --short HEAD)

.PHONY: prepare
prepare: base-container
	docker run -u $(CONTAINER_UID_GID) --rm -t -v $(PWD):/home/reconmapper --entrypoint npm $(DOCKER_DEV_TAG) install npm-check-updates
	docker run -u $(CONTAINER_UID_GID) --rm -t -v $(PWD):/home/reconmapper --entrypoint npm $(DOCKER_DEV_TAG) install

.PHONY: base-container
base-container:
	docker build -f docker/node.Dockerfile --build-arg HOST_USER_ID=$(HOST_USER_ID) --build-arg HOST_GROUP_ID=$(HOST_GROUP_ID) -t $(DOCKER_DEV_TAG) .

.PHONY: version-increase
version-increase:
	docker run -u $(CONTAINER_UID_GID)--rm -t -v $(PWD):/home/reconmapper --entrypoint npm $(DOCKER_DEV_TAG) version patch -m "Increment version to %s"

.PHONY: start
start:
	docker run -u $(CONTAINER_UID_GID) --rm -it \
		-v $(PWD):/home/reconmapper \
		-v $(PWD)/$(ENV_FILE_NAME):/home/reconmapper/public/environment.js \
		-p 5500:5500 \
		-e REACT_APP_GIT_COMMIT_HASH=$(GIT_COMMIT_HASH) \
		-e NODE_OPTIONS="--max-old-space-size=8192" \
		--entrypoint yarn \
		--name $(DOCKER_CONTAINER_NAME) \
		$(DOCKER_DEV_TAG) start

.PHONY: stop
stop:
	docker stop $(DOCKER_CONTAINER_NAME) || true

.PHONY: tests
tests:
	docker run -u $(CONTAINER_UID_GID) --rm -it \
		-v $(PWD):/home/reconmapper \
		-v $(PWD)/$(ENV_FILE_NAME):/home/reconmapper/public/environment.js \
		--entrypoint yarn -e CI=true $(DOCKER_DEV_TAG) test

.PHONY: tests-ci
tests-ci:
	docker run -u $(CONTAINER_UID_GID) --rm -t \
		-v $(PWD):/home/reconmapper \
		-v $(PWD)/$(ENV_FILE_NAME):/home/reconmapper/public/environment.js \
		--entrypoint yarn -e CI=true $(DOCKER_DEV_TAG) test:ci

.PHONY: clean
clean: stop
	git clean -fdx

.PHONY: build
build:
	docker build -f docker/app.Dockerfile \
		--build-arg RECONMAP_APP_GIT_COMMIT_HASH=$(GIT_COMMIT_HASH) \
		-t $(DOCKER_IMAGE_NAME):$(GIT_BRANCH_NAME) -t $(DOCKER_IMAGE_NAME):latest .

.PHONY: push
push:
	docker push $(DOCKER_IMAGE_NAME):$(GIT_BRANCH_NAME)
	docker push $(DOCKER_IMAGE_NAME):latest

.PHONY: shell
shell:
	docker exec -it $(DOCKER_CONTAINER_NAME) bash


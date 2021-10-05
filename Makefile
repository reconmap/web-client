SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c
.ONESHELL:
.DELETE_ON_ERROR:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

ENV_FILE_NAME ?= environment.local.js
DOCKER_IMAGE_NAME = quay.io/reconmap/web-client
DOCKER_CONTAINER_NAME = reconmap-web-client
DOCKER_DEFAULT_TAG = $(DOCKER_IMAGE_NAME)

ifdef TRAVIS_BRANCH
GIT_BRANCH_NAME = $(TRAVIS_BRANCH)
else
GIT_BRANCH_NAME = $(shell git rev-parse --abbrev-ref HEAD)
endif

GIT_COMMIT_HASH = $(shell git rev-parse --short HEAD)

.PHONY: prepare
prepare:
	docker build -f docker/node.Dockerfile -t $(DOCKER_DEFAULT_TAG) .
	docker run --rm -t -w /var/www/webapp -v $(PWD):/var/www/webapp --entrypoint npm $(DOCKER_DEFAULT_TAG) install -g npm-check-updates
	docker run --rm -t -w /var/www/webapp -v $(PWD):/var/www/webapp --entrypoint npm $(DOCKER_DEFAULT_TAG) install

.PHONY: start
start:
	docker run --rm -it \
		-w /var/www/webapp \
		-v $(PWD):/var/www/webapp \
		-v $(PWD)/$(ENV_FILE_NAME):/var/www/webapp/public/environment.js \
		-p 3001:3001 \
		-e REACT_APP_GIT_COMMIT_HASH=$(GIT_COMMIT_HASH) \
		-e NODE_OPTIONS="--max-old-space-size=8192" \
		--entrypoint yarn \
		--name $(DOCKER_CONTAINER_NAME) \
		$(DOCKER_DEFAULT_TAG) start

.PHONY: stop
stop:
	docker stop $(DOCKER_CONTAINER_NAME) || true

.PHONY: tests
tests:
	docker run --rm -it -w /var/www/webapp \
		-v $(PWD):/var/www/webapp \
		-v $(PWD)/$(ENV_FILE_NAME):/var/www/webapp/public/environment.js \
		--entrypoint yarn -e CI=true $(DOCKER_DEFAULT_TAG) test

.PHONY: tests-ci
tests-ci:
	docker run --rm -t -w /var/www/webapp \
		-v $(PWD):/var/www/webapp \
		-v $(PWD)/$(ENV_FILE_NAME):/var/www/webapp/public/environment.js \
		--entrypoint yarn -e CI=true $(DOCKER_DEFAULT_TAG) test:ci

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


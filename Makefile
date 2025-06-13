SHELL := bash
.SHELLFLAGS := -eu -o pipefail -c
.ONESHELL:
.DELETE_ON_ERROR:
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules

ENV_FILE_NAME ?= config.local.json
DOCKER_IMAGE_NAME = ghcr.io/reconmap/web-client
DOCKER_CONTAINER_NAME = reconmap-web-client
DOCKER_DEV_TAG = reconmap/web-client:dev

# macOS is using different IDs than linux
UNAME=$(shell uname)
ifeq ($(UNAME),Darwin)
	HOST_UID=1000
	HOST_GID=1000
else
	HOST_UID=$(shell id -u)
	HOST_GID=$(shell id -g)
endif
CONTAINER_UID_GID=$(HOST_UID):$(HOST_GID)

GIT_BRANCH_NAME = $(shell git rev-parse --abbrev-ref HEAD)
GIT_COMMIT_HASH = $(shell git rev-parse --short HEAD)

.PHONY: prepare
prepare: base-container
	docker run -u $(CONTAINER_UID_GID) --rm -t -v $(PWD):/home/reconmapper --entrypoint npm $(DOCKER_DEV_TAG) add npm-check-updates
	docker run -u $(CONTAINER_UID_GID) --rm -t -v $(PWD):/home/reconmapper --entrypoint npm $(DOCKER_DEV_TAG) install

.PHONY: base-container
base-container:
	docker build -f docker/node.Dockerfile --build-arg HOST_UID=$(HOST_UID) --build-arg HOST_GID=$(HOST_GID) -t $(DOCKER_DEV_TAG) .

.PHONY: version-increase
version-increase:
	git stash
	docker run -u $(CONTAINER_UID_GID) --rm -t -v $(PWD):/home/reconmapper -v "${HOME}/.gitconfig:/home/reconmapper/.gitconfig" --entrypoint npm $(DOCKER_DEV_TAG) version --no-commit-hooks patch -m "Increment version to %s"
	git stash pop || true

.PHONY: start
start:
	docker run -u $(CONTAINER_UID_GID) --rm -it \
		-v $(PWD):/home/reconmapper \
		-v $(PWD)/$(ENV_FILE_NAME):/home/reconmapper/packages/app/public/config.json \
		-p 5500:5500 \
		-e VITE_GIT_COMMIT_HASH=$(GIT_COMMIT_HASH) \
		-e NODE_OPTIONS="--max-old-space-size=8192" \
		--entrypoint npm \
		--name $(DOCKER_CONTAINER_NAME) \
		$(DOCKER_DEV_TAG) run start -w @reconmap/app

.PHONY: stop
stop:
	docker stop $(DOCKER_CONTAINER_NAME) || true

.PHONE: lint
lint:
	docker run -u $(CONTAINER_UID_GID) --rm \
		-v $(PWD):/home/reconmapper \
		-v $(PWD)/$(ENV_FILE_NAME):/home/reconmapper/public/config.json \
		--entrypoint npm $(DOCKER_DEV_TAG) run lint -w @reconmap/app
	docker run -u $(CONTAINER_UID_GID) --rm \
		-v $(PWD):/home/reconmapper \
		-v $(PWD)/$(ENV_FILE_NAME):/home/reconmapper/public/config.json \
		--entrypoint npx $(DOCKER_DEV_TAG) stylelint "**/*.css"

.PHONY: tests
tests: lint
	docker run -u $(CONTAINER_UID_GID) --rm -it \
		-v $(PWD):/home/reconmapper \
		-v $(PWD)/$(ENV_FILE_NAME):/home/reconmapper/packages/app/public/config.json \
		--entrypoint npm $(DOCKER_DEV_TAG) run test -w @reconmap/app

.PHONY: tests-ci
tests-ci:
	docker run -u $(CONTAINER_UID_GID) --rm -t \
		-v $(PWD):/home/reconmapper \
		-v $(PWD)/$(ENV_FILE_NAME):/home/reconmapper/packages/app/public/config.json \
		--entrypoint npm -e CI=true $(DOCKER_DEV_TAG) run test:ci -w @reconmap/app

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

.PHONY: sudo-shell
sudo-shell:
	docker exec -u 0 -it $(DOCKER_CONTAINER_NAME) bash

.PHONY: update-license-data
update-license-data:
	yarn licenses list --json | jq --slurp . > src/data/licenses.json


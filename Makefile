
RECONMAP_APP_STAGE ?= dev
DOCKER_IMAGE_NAME = quay.io/reconmap/web-client
DOCKER_CONTAINER_NAME = reconmap-web-client
DOCKER_DEFAULT_TAG = $(DOCKER_IMAGE_NAME):master

.PHONY: prepare
prepare:
	docker build -f docker/Dockerfile -t $(DOCKER_DEFAULT_TAG) .
	docker run --rm -it -w /var/www/webapp -v $(PWD):/var/www/webapp --entrypoint npm $(DOCKER_DEFAULT_TAG) install -g npm-check-updates
	docker run --rm -it -w /var/www/webapp -v $(PWD):/var/www/webapp --entrypoint npm $(DOCKER_DEFAULT_TAG) install

.PHONY: start
start:
	docker run --rm -it \
		-w /var/www/webapp \
		-v $(PWD):/var/www/webapp \
		-p 3001:3001 \
		-e REACT_APP_STAGE=$(RECONMAP_APP_STAGE) \
		-e NODE_OPTIONS="--max-old-space-size=8192" \
		--entrypoint yarn \
		--name $(DOCKER_CONTAINER_NAME) \
		$(DOCKER_DEFAULT_TAG) start

.PHONY: stop
stop:
	docker stop $(DOCKER_CONTAINER_NAME) || true

.PHONY: tests
tests:
	docker run --rm -it -w /var/www/webapp -v $(PWD):/var/www/webapp --entrypoint yarn -e CI=true $(DOCKER_DEFAULT_TAG) test

.PHONY: tests-ci
tests-ci:
	docker run --rm -it -w /var/www/webapp -v $(PWD):/var/www/webapp --entrypoint yarn -e CI=true $(DOCKER_DEFAULT_TAG) test:ci

.PHONY: clean
clean: stop
	git clean -fdx

.PHONY: build
build:
	docker build -f docker/prod.Dockerfile \
		--build-arg RECONMAP_APP_STAGE=$(RECONMAP_APP_STAGE) \
		-t $(DOCKER_IMAGE_NAME):$(RECONMAP_APP_STAGE) .

.PHONY: push
push:
	docker push $(DOCKER_IMAGE_NAME):$(RECONMAP_APP_STAGE)

.PHONY: shell
shell:
	docker exec -it $(DOCKER_CONTAINER_NAME) bash


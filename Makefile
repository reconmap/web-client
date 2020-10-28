
RECONMAP_APP_STAGE ?= dev
DOCKER_IMAGE_NAME = reconmap/web-frontend
DOCKER_BASE_IMAGE = $(DOCKER_IMAGE_NAME):base

.PHONY: prepare
prepare:
	docker build -f docker/Dockerfile -t $(DOCKER_BASE_IMAGE) .
	docker run --rm -it -w /var/www/webapp -v $(PWD):/var/www/webapp --entrypoint npm $(DOCKER_BASE_IMAGE) install -g npm-check-updates
	docker run --rm -it -w /var/www/webapp -v $(PWD):/var/www/webapp --entrypoint npm $(DOCKER_BASE_IMAGE) install

.PHONY: start
start:
	docker run --rm -it \
		-w /var/www/webapp \
		-v $(PWD):/var/www/webapp \
		-p 3001:3000 \
		-e REACT_APP_STAGE=$(RECONMAP_APP_STAGE) \
		-e NODE_OPTIONS="--max-old-space-size=8192" \
		--entrypoint yarn \
		--name reconmap-web-frontend \
		$(DOCKER_BASE_IMAGE) start

.PHONY: stop
stop:
	docker stop reconmap-web-frontend || true

.PHONY: tests
tests:
	docker run --rm -it -w /var/www/webapp -v $(PWD):/var/www/webapp --entrypoint yarn -e CI=true $(DOCKER_BASE_IMAGE) test

.PHONY: tests-ci
tests-ci:
	docker run --rm -it -w /var/www/webapp -v $(PWD):/var/www/webapp --entrypoint yarn -e CI=true $(DOCKER_BASE_IMAGE) test:ci

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
	docker exec -it reconmap-web-frontend bash


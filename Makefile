
RECONMAP_APP_STAGE ?= dev

.PHONY: prepare
prepare:
	docker build -f docker/Dockerfile -t reconmap-web-frontend:base .
	docker run --rm -it -w /var/www/webapp -v $(PWD):/var/www/webapp --entrypoint npm reconmap-web-frontend install -g npm-check-updates
	docker run --rm -it -w /var/www/webapp -v $(PWD):/var/www/webapp --entrypoint npm reconmap-web-frontend install

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
		reconmap-web-frontend:base start

.PHONY: stop
stop:
	docker stop reconmap-web-frontend || true

.PHONY: tests
tests: prepare
	docker run --rm -it -w /var/www/webapp -v $(PWD):/var/www/webapp --entrypoint yarn -e CI=true reconmap-web-frontend:base test

.PHONY: tests-ci
tests-ci: prepare
	docker run --rm -it -w /var/www/webapp -v $(PWD):/var/www/webapp --entrypoint yarn -e CI=true reconmap-web-frontend:base test:ci

.PHONY: clean
clean: stop
	git clean -fdx

.PHONY: build
build: stop
	docker build -f docker/prod.Dockerfile -t reconmap/web-frontend:prod .

.PHONY: push
push:
	docker push reconmap/web-frontend:prod

.PHONY: shell
shell:
	docker exec -it reconmap-web-frontend bash


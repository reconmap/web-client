
RECONMAP_APP_STAGE ?= dev

.PHONY: prepare
prepare:
	docker build -t reconmap-web-frontend .
	docker run --rm -it -w /var/www/webapp -v $(PWD):/var/www/webapp --entrypoint npm reconmap-web-frontend install

.PHONY: start
start:
	docker run --rm -it \
		-w /var/www/webapp \
		-v $(PWD):/var/www/webapp \
		-p 3001:3000 \
		-e REACT_APP_STAGE=$(RECONMAP_APP_STAGE) \
		--entrypoint yarn \
		--name reconmap-web-frontend \
		reconmap-web-frontend start

.PHONY: tests
tests: prepare
	docker run --rm -it -w /var/www/webapp -v $(PWD):/var/www/webapp --entrypoint yarn -e CI=true reconmap-web-frontend test

.PHONY: tests-ci
tests-ci: prepare
	docker run --rm -it -w /var/www/webapp -v $(PWD):/var/www/webapp --entrypoint yarn -e CI=true reconmap-web-frontend test:ci

.PHONY: clean
clean:
	docker stop reconmap-web-frontend || true
	git clean -fdx



.PHONY: prepare
prepare:
	docker build -t reconmap-web-frontend .
	docker run --rm -it -w /var/www/webapp -v $(PWD):/var/www/webapp --entrypoint npm reconmap-web-frontend install

.PHONY: run
run: prepare
	docker run --rm -it -w /var/www/webapp -v $(PWD):/var/www/webapp -p 3001:3000 --entrypoint yarn reconmap-web-frontend start

.PHONY: tests
tests: prepare
	docker run --rm -it -w /var/www/webapp -v $(PWD):/var/www/webapp --entrypoint yarn -e CI=true reconmap-web-frontend test

.PHONY: ci-tests
ci-tests: prepare
	docker run --rm -it -w /var/www/webapp -v $(PWD):/var/www/webapp --entrypoint yarn -e CI=true reconmap-web-frontend ci-test


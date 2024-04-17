.DEFAULT_GOAL := build
DOCKER_TAG = docker.io/overhangio/academy:latest

clean: ## Clean any existing site
	rm -rf _build/
	rm -rf contents/_build

build: clean ## Build site
	python build.py
	cp -r layout/static _build/academy/static

watch: build ## Watch for changes and build site
	while true; do $(MAKE) wait-for-change build || true; done

wait-for-change:
	inotifywait -e modify $(shell find layout/ contents/) build.py

serve: build ## Launch a development server
	@echo "-----> http://localhost:8042/academy"
	@python -m http.server --bind localhost 8042 -d _build

docker-build: ## Build the Docker image
	docker build --tag ${DOCKER_TAG} .

docker-push: docker-build ## Push the Docker image to Docker Hub
	docker push ${DOCKER_TAG}

docker-run: docker-build ## Run the Docker container on port 8043
	@echo "-----> http://localhost:8043/academy"
	docker run --rm -p 127.0.0.1:8043:8043 ${DOCKER_TAG}

ESCAPE = ^[
help: ## Print this help
	@grep -E '^([a-zA-Z_-]+:.*?## .*|######* .+)$$' Makefile \
			| sed 's/######* \(.*\)/@               $(ESCAPE)[1;31m\1$(ESCAPE)[0m/g' | tr '@' '\n' \
			| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[33m%-30s\033[0m %s\n", $$1, $$2}'

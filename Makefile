include .env
export $(shell sed 's/=.*//' .env)

clean:

build:
	@docker image rm --force $(HUB_URL)/$(APP_NAME):$(APP_VERSION) || true
	@docker build -t ${HUB_URL}/$(APP_NAME):$(APP_VERSION) --build-arg VERSION=$(APP_VERSION) .

publish:
	@docker login ${HUB_URL}
	@docker push ${HUB_URL}/$(APP_NAME):$(APP_VERSION)

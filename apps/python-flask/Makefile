.DEFAULT_GOAL := deploy
SHELL := /bin/bash

DOCKER     := docker
SKAFFOLD   := skaffold
MAKE       := source .hub/current && $(MAKE)

export SKAFFOLD_PROFILE ?= incluster
export HUB_APP_NAME     ?= rubik

skaffold-%:
	$(SKAFFOLD) $(lastword $(subst -, ,$@))

src/% .hub/%:
	$(MAKE) -C "$(@D)" $(@F)

clean: .hub/clean src/clean
generate: .hub/generate
configure: clean generate
dev skaffold: skaffold-dev
build: skaffold-build
run deploy: skaffold-run
delete undeploy: skaffold-delete

.PHONY: clean generate hub dev run

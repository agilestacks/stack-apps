.DEFAULT_GOAL := generate

aws     := aws
kubectl := kubectl
yq      := yq
curl    := curl -sSL --silent --create-dirs

APP_DIR             := ..
TEMPLATES_DIR       := templates
LIBSONNET_DIR       := lib

LIBSONNET           := $(LIBSONNET_DIR)/k8s.libsonnet
LIBSONNET           += $(LIBSONNET_DIR)/dockerconfig.libsonnet

JSONNET_FILES       := $(wildcard *.jsonnet .*.jsonnet **/*.jsonnet .**/*.jsonnet)
JSON_JSONNET        := $(patsubst %.jsonnet,$(APP_DIR)/%.json,$(filter-out %.yaml.jsonnet,$(JSONNET_FILES)))
YAML_JSONNET        := $(patsubst %.jsonnet,$(APP_DIR)/%,$(filter %.yaml.jsonnet,$(JSONNET_FILES)))
TEMPLATES           := $(addsuffix .json,$(basename $(wildcard $(TEMPLATES_DIR)/*.yaml)))

export JSONNET_PATH   := $(TEMPLATES_DIR):$(LIBSONNET_DIR):$(APP_DIR)
export AWS_ACCOUNT_ID := $(shell $(aws) sts get-caller-identity --query 'Account' --output text)

export KUBECONFIG     ?= $(APP_DIR)/.kubeconfig
export HUB_KNOWN_KUBECONFIGS := $(wildcard $(dir $(KUBECONFIG))/kubeconfig.*)

JSONNET_ARGS += $(addprefix -V ,$(filter HUB_%,$(.VARIABLES)))
JSONNET_ARGS += $(addprefix -V ,$(filter AWS_%,$(.VARIABLES)))
JSONNET_ARGS += $(addprefix -V ,$(filter SKAFFOLD_%,$(.VARIABLES)))
JSONNET_ARGS += -V KUBECONFIG
jsonnet      := jsonnet $(JSONNET_ARGS)

$(TEMPLATES):
	$(yq) r $(basename $@).yaml -j > $@

$(LIBSONNET):
	$(curl) -o $@ https://github.com/agilestacks/jsonnet/raw/master/lib/$(@F)

$(YAML_JSONNET): $(LIBSONNET) $(TEMPLATES)
	$(eval fname := $(patsubst $(APP_DIR)/%,$(CURDIR)/%,$@))
	@ mkdir -p "$(@D)"
	$(jsonnet) "$(fname).jsonnet" | $(yq) r - > $@

$(JSON_JSONNET): $(LIBSONNET) $(TEMPLATES)
	$(eval fname := $(basename $(patsubst $(APP_DIR)/%,$(CURDIR)/%,$@)))
	@ mkdir -p "$(@D)"
	$(jsonnet) "$(fname).jsonnet" > $@

generate: $(YAML_JSONNET) $(JSON_JSONNET)

clean:
	rm -f $(YAML_JSONNET) $(JSON_JSONNET) $(LIBSONNET) $(TEMPLATES)

.PHONY: generate clean
.DELETE_ON_ERROR: $(YAML_JSONNET) $(JSON_JSONNET) $(LIBSONNET) $(TEMPLATES)

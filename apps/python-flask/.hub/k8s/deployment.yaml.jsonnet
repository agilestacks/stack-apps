local k8s = import 'k8s.libsonnet';
local template = import 'deployment.json';
local app = std.extVar("HUB_APP_NAME");

local appLabels = {
  app: app,
};

local result = template + {
  metadata+: {
    name: app,
  },
  spec+: {
    selector+: {
      matchLabels+: appLabels,
    },
    template+: {
      metadata+: {
        labels+: appLabels,
      },
    },
  },
};

std.prune(result)

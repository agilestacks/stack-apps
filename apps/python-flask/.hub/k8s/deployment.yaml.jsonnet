local k8s = import 'k8s.libsonnet';
local template = import 'deployment.json';
local app = std.extVar("HUB_APP_NAME");

local appLabels = {
  app: std.extVar("HUB_APP_NAME"),
};

local result = template + {
  metadata+: {
    name: std.extVar("HUB_APP_NAME"),
  },
  spec+: {
    selector+: {
      matchLabels+: appLabels, 
    },
    template+: {
      metadata+: {
        labels+: appLabels,
      },
      spec+: {
        containers: [
          template.spec.template.spec.containers[0] + {
            image: app
          }
        ],
      },
    },
  },
};

std.prune(result)

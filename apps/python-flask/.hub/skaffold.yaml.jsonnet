local skaffold = import 'skaffold.libsonnet';
local template = import 'skaffold.json';
local app = std.extVar("HUB_APP_NAME");

local result = template {
  metadata +: {
    name: app + "-",
  },
  build +: {
    artifacts: [
      template.build.artifacts[0] + { 
        image: app,
      }
    ],
  },
};

std.prune(result)

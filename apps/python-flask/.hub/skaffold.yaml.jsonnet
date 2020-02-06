local skaffold = import 'skaffold.libsonnet';
local template = import 'skaffold.json';
local app = std.extVar("HUB_APP_NAME");

local result = template {
  metadata +: {
    name: app + "-",
  },
  build+: {
    artifacts: [
      artifact {
        image: app
      }
      for artifact in super.artifacts
    ] 
  },
  test: [
    tst {
      image: app,
    }
    for tst in super.test
  ],
};
std.prune(result)

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
  profiles: [
    local tests = if "test" in profile then {
      test: [
        tst {
          image: app
        },
        for tst in super.test
      ]
    } else {};

    profile + tests
    for profile in super.profiles
  ],
  // test: [
  //   tst {
  //     image: app,
  //   }
  //   for tst in super.test
  // ],
};
std.prune(result)

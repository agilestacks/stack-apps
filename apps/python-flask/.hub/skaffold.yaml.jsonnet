local template = import 'skaffold.json';
local app = std.extVar('HUB_APP_NAME');

local setClusterProfile(build) =
  if 'cluster' in build then {
    cluster: build.cluster {
      dockerConfig+: {
        secretName: app + '-dockerconfig',
      },
    },
  } else {};


local result = template {
  metadata+: {
    name: app + '-',
  },
  build+: {
    artifacts: [
      artifact {
        image: app,
      }
      for artifact in super.artifacts
    ],
  },
  profiles: [
    local tests = if 'test' in profile then {
      test: [
        tst {
          image: app,
        }
        for tst in super.test
      ],
    } else {};
    local build = if 'build' in profile then {
      build: profile.build + setClusterProfile(profile.build),
    } else {};
    profile + tests + build
    for profile in super.profiles
  ],

  // test: [
  //   tst {
  //     image: app,
  //   }
  //   for tst in super.test
  // ],
};
//std.prune(result)
result

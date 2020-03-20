local template = import 'skaffold.json';
local app = std.extVar('HUB_APP_NAME');

// avoid possible naming collisiton
// for kaniko secrets in the sane manespace
local withKanikoSecret(build) =
  if 'cluster' in build then {
    cluster: build.cluster {
      dockerConfig+: {
        secretName: 'kaniko-' + app,
      },
    },
  } else {};


template {
  metadata+: {
    name: app + '-',
  },
  profiles: [
    profile + if 'build' in profile then {
      build+: withKanikoSecret(profile.build),
    }
    for profile in super.profiles
  ],
}

local template = import 'skaffold.json';
local app = std.extVar('HUB_APP_NAME');
local host = std.extVar('HUB_APP_HOST');
local repo = std.extVar('SKAFFOLD_DEFAULT_REPO');

// avoid possible naming collisiton
// for kaniko secrets in the same namespace
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
  build+: {
    artifacts: [
      artifact + if 'image' in artifact then {
        image: repo + '/' + artifact.image
      }
      for artifact in super.artifacts
    ],
  },
  deploy+: {
    helm+: {
      releases: [
        release + if 'artifactOverrides' in release && 'setValues' in release then {
          artifactOverrides+: {
            image: repo + '/' + super.image,
          },
          setValues+: {
            'ingress.host': host,
            'ingress.tlsHost': host,
          },
        } else release
        for release in super.releases
      ],
    }
  },
  profiles: [
    profile + if 'build' in profile then {
      build+: withKanikoSecret(profile.build),
    }
    for profile in super.profiles
  ],
}

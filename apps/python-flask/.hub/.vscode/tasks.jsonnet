local base = import 'vscode-tasks.json';
local app = std.extVar("HUB_APP_NAME");

base {
  tasks: [
    task {
      options+: {
        env+: {
          HUB_APP_NAME: app,
          HUB_DOCKER_HOST: std.extVar("HUB_DOCKER_HOST"),
          HUB_INGRESS_HOST: std.extVar("HUB_INGRESS_HOST"),
          SKAFFOLD_PROFILE: std.extVar("SKAFFOLD_PROFILE"),
          SKAFFOLD_DEFAULT_REPO: std.extVar("SKAFFOLD_DEFAULT_REPO"),
          KUBECONFIG: std.extVar("KUBECONFIG")
        },
      },
    },

    for task in super.tasks
  ],
}


// std.format(str, vals)
// std.strReplace(str, from, to)

local base = import 'vscode-tasks.json';
local kubeconfig = std.extVar("KUBECONFIG");
local skaffold_profile = std.extVar("SKAFFOLD_PROFILE");
local skaffold_default_repo = std.extVar("SKAFFOLD_DEFAULT_REPO");
local hub_app_name = std.extVar("HUB_APP_NAME");
local hub_ingress_host = std.extVar("HUB_INGRESS_HOST");

base {
  tasks: [
    task {
      options+: {
        env+: {
          HUB_APP_NAME: hub_app_name,
          HUB_INGRESS_HOST: hub_ingress_host,
          SKAFFOLD_PROFILE: skaffold_profile,
          SKAFFOLD_DEFAULT_REPO: skaffold_default_repo,
          KUBECONFIG: kubeconfig,
        },
      },
    },

    for task in super.tasks
  ],
}

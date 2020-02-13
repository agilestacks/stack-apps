local base = import 'vscode-tasks.json';

base {
  tasks: [
    task {
      options+: {
        env+: {
          HUB_APP_NAME: std.extVar("HUB_APP_NAME"),
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

local template = import 'vscode-launch.json';
local app_name = std.extVar("HUB_APP_NAME");
local registry = std.extVar("HUB_DOCKER_HOST") + "/library";

template {
  configurations: [
    config {
      name: std.format(config.name, app_name),
      imageRegistry: registry,
      podSelector: {
        app: app_name
      }
    }
    for config in super.configurations
  ]
}

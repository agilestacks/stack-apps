local template = import 'vscode-launch.json';
local app_name = std.extVar("HUB_APP_NAME");
local registry = std.extVar("HUB_DOCKER_HOST") + "/library";

template {
  configurations: [
    local name = if std.findSubstr("%s", config.name) != [] then {
      name: std.format(config.name, app_name),
    } else {};
    
    local podSelector = if "podSelector" in config then {
      podSelector+: {
        app: app_name,
      }
    } else {};
    
    local imageRegistry = if "imageRegistry" in config then {
      imageRegistry: registry,
    } else {};
    
    config + name + podSelector + imageRegistry
    for config in super.configurations
  ]
}

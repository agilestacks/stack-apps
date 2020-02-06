local k8s = import 'k8s.libsonnet';
local docker_host = std.extVar("HUB_DOCKER_HOST");
local stripped_hostname = std.split(docker_host,":")[0];
local app = std.extVar("HUB_APP_NAME");

local result = {
  auths: {
    [stripped_hostname]: {
      username: std.extVar("HUB_DOCKER_USER"),
      password: std.extVar("HUB_DOCKER_PASS"),
    }
  },
  credHelpers: import 'dockerconfig.libsonnet',
};

std.prune(result)

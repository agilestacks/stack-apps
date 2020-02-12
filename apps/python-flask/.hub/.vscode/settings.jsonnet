local template = import 'vscode-settings.json';
local app_name = std.extVar("HUB_APP_NAME");
local domain_name = std.extVar("HUB_DOMAIN_NAME");
local kubeconfig  = std.extVar("KUBECONFIG");
local docker_registry = std.extVar("HUB_DOCKER_HOST") + "/library";
local known_kubeconfigs = std.split(std.extVar("HUB_KNOWN_KUBECONFIGS"), " ");

local parts     = std.split(kubeconfig, "/");
local file      = parts[std.length(parts)-1];
local basename = std.strReplace(file, ".yaml", "");
local contextName = std.strReplace(basename, "kubeconfig.", "");

template + {
    "vsdocker.imageUser": docker_registry,
    "vs-kubernetes": {
        "vs-kubernetes.knownKubeconfigs": known_kubeconfigs,
        "vs-kubernetes.kubeconfig": kubeconfig,
    },
    "cloudcode.active-kubeconfig": contextName,
    "cloudcode.profile-registry-map": {
        "local": docker_registry,
        "incluter": docker_registry,
    },
    "cloudcode.kubeconfigs": [
    {
        local prts = std.split(fullpath, "/"),
        local f    = prts[std.length(prts)-1],
        local b1   = std.strReplace(f, ".yaml", ""),
        local b2   = std.strReplace(b1, "kubeconfig.", ""),
        name: b2,
        configPath: fullpath,
    }
    for fullpath in known_kubeconfigs
    ],
    "cloudcode.last-used-context": {
        [std.format("%s: Launch on Kubernetes", app_name)]: {
            "kubeConfigPath": kubeconfig,
            "contextName": contextName,
        },
    },
}

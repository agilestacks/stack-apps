local k8s = import 'k8s.libsonnet';
local template = import 'deployment.json';
local app = std.extVar("HUB_APP_NAME");
local appLabels = { app: app,};
local result = template + { 
  metadata+: { 
    name: app, 
  }, 
  spec+: { 
    selector+: { 
      matchLabels+: appLabels, 
    }, 
    template+: { 
      metadata+: { 
        labels+: appLabels, 
      }, 
      spec+: { 
        containers: [ 
          container + { 
            env: [
              k8s.envVar("HUB_DATABASE_URI")
            ],
          }
          for container in super.containers 
        ], 
        initContainers: [{
          image: "app",
          name: "init-db",
          command: ["flask", "db", "upgrade"],
          env: [
            k8s.envVar("HUB_DATABASE_URI")
          ]
        }], 
      }, 
    }, 
  },
};

std.prune(result)
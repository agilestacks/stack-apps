# Documentation

This is home for the applicaitons documentation

## Code Generation

We use a [Jsonnet](https://jsonnet.org) as a templating a default templating DSL for YAML and JSON configuration

- Q: Why can't I use a mustache template for my yaml/jsnon file?
- A: You can, however this is an anti-pattern (see this: [templating in yaml](https://www.thoughtworks.com/radar/techniques/templating-in-yaml))

To incorporate some if-then-else, for loop comprehensions and mixins we prefer to use a JSonnet. However we are not limited to Jsonnet. Just don't use a `ksonnet` as it seems to be a zombie
Common libs for jsonnet can be found here: https://github.com/agilestacks/jsonnet
All JSONNET scripts has been placed to the `.hub/` directory.

## .hub

Every application have got a special directory called `./hub`. This section describes what you can find inside

```
Applicaiton dir/                    # root directory of the applicaitno
  .hub/                             # superhub internals, related to code generation
    env/                            # `hub configure` will download environment configuration here.
      configure                     # a shell script that is triggered by `hub configure` command to provide a configuration for the app
      <stack-name>.env              # environment file (fetched by `hub configure`). It has all necessary configuration for the application.
      kubeconfig.<stack-name>.yaml  # kubeconfig of the stack (fetched by `hub configure`)
    templates/                      # Provide a base for the jsonnet manifests generation. Added to the JSONNET_PATH 
      *.json                        # JSON or YAML format accepted for base
      *.yaml                        # Yaml format will be converted to JSON before pasing to JSONNET
    **/*.jsonnet                    # JSonnet script: result of the script will be same file (same directory) under the application directory with `json` extension
    **/*.yaml.jsonnet               # JSonnet script: works similarly, but resulting json file has been converted to `yaml` format
    Makefile                        # Triggers `make generate` routines
  .env                              # Simlink to the currently actual environemnt file
  .gitignore                        # gitignore file. Typically have generated files
  applciation files                 # other applciation code
```

## Jsonet

Jsonnet has been controlled by the `Makefile`. It handles JSON and YAML generation routines. Here is the logic for the code generation.

* if Jsonnet file has been available in: `app-dir/.hub/foo/bar.jsonnet` then the result will be generated as: `app-dir/foo/bar.json`
* if Jsonnet has been available in: `app-dir/.hub/foo/bar.yaml.jsonnet` then the result will be generated as: `app-dir/foo/bar.yaml`
* if Jsonnet file has been available in `app-dir/foo/bar/jsonnet` then nothing will be generated

Makefile doenlaods templates for the Jsonnet (`*.libsonnet` files) has been downloaded by the Makefile from http://github.com/agilestacks/jsonnet to the `.hub/lib` directory. This directory has been referenced as `JSONNET_PATH`. 
To use your own libsonnet file, add it to: `.hub/lib` directory and commit to the git.

** .env

Environment has been configuration has been distributed as well known [.env](https://github.com/bkeepers/dotenv) files. .env has bene used in all major programming language as [12 factor](https://12factor.net) configuration. SuperHub is using similar approach as it appears to be more natural and yet language independent configuration management format.
Environment has been fetched by command: `hub configure -s mydesiredstack` and stored in `.hub/env` directory. Then `.env` is a symlink to the current actual `.env/environment/*.env` file

## How to add extra stuff to env file

Here is an of the configuration script that from `.hub/env/configure` 
```bash
#!/bin/bash
# variables:
#   STACK       points to the name of the stack
#   KUBECONFIG  absolute path of kubeconfig
#   HUB_CONTEXT absolute path to the current rendered file
#
# JQ_ARGS has been used by hub-show to parametrize jq outputs
export JQ_ARGS="-rMc"
TMPL="
#!/bin/sh
export HUB_APP_NAME=myapp
export HUB_DOMAIN_NAME=`hub-show -s $STACK -q '.parameters.dns.domain'`
export HUB_INGRESS_HOST=`hub-show -s $STACK -q '.parameters.component.ingress.fqdn'`
export HUB_DOCKER_HOST=`hub-show -s $STACK -q '.parameters.component.docker.auth.host'`
export HUB_DOCKER_USER=`hub-show -s $STACK  -q '.parameters.component.docker.auth.basic.username'`
export SKAFFOLD_DEFAULT_REPO=`hub-show -s $STACK -q '.parameters.component.docker.auth.host'`/library
export SKAFFOLD_PROFILE=incluster
export KUBECONFIG=$KUBECONFIG
export HUB_CONTEXT=$HUB_CONTEXT
"
echo "$TMPL"
```

Add your configuration to this file and run
```bash
make -c ".hub" generate FORCE=1
```

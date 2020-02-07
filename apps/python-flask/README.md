# Deploy a Flask application with Skaffold

In current article we will review how to organize a Python development with Kubernetes using Skaffold.

We will do the following:
1. Setting up applcation
2. Setting up VSCode
3. Deploy application to the Kubernetes cluster

## Motivation

I as an app builder want to have similar and productive experience when I build my application with remote Kubernetes Cluster as I would do the same on my local workstation. More details why we are decided to use Skaffold on our Slide Deck [here](TBD)

## Setting Up Applciation

0. Download hub  CLI from [https://cli.superhub.io](cli.superhub.io)

```bash
# MacOS users
curl -o superhub.tar.gz https://cli.superhub.io/darwin/latest
tar xvz superhub.tar.gz
cp -v superhub/bin/hub /usr/local/bin
```


1. Get application source code

```bash
$ git clone https://github.com/agilestacks/stack-apps.git
$ cd stack-apps/apps/python-flask
```
Let's see  what we have got here:

```
python-flask:
  /.hub             # SuperHub code generation has been located here
  /src              # Our python application has been located here
  /test             # Container structure texts will be here
  Dockerfile        # docker image with your application  
```

2. Retrieve SuperHub API Token.

You can retrieve your API token from the (controlplane.agilestacks.io)[https://controlplane.agilestacks.io/#/user/profile]. Or using CLI:
```
$ hub login
Username: john.doe@example.com   # your SuperHub control plane username
Password: **********             # your SuperHub control plane password

export HUB_TOKEN=sergd......kieud
```

Export `HUB_TOKEN` environment variable to access to the automation hub API. We will need it to connect our application code with the parameters of the Kubernetes cluster.

Run the following commands:
```
$ echo $HUB_TOKEN
sergd......kieud

$ hub-ls -p harbor -p kubernetes
abc.superhub.io
def.superhub.io
```

Code above will validate that `HUB_TOKEN` environment variable has been defined. Then we will use this toke to fetch list of currently deployed clusters that provides both: `Kubernetes` cluster and `Harbor` private docker registry. This code also confirms that I do have my prerequisites.

3. Apply cluster configuration

Run the following commands:
```bash
$ hub-configure -s abc.superhub.io
# where abc.superhub.io is tbe desired cluster for my application (see previous section)

$ source .hub/current
$ kubectl cluster-info
Kubernetes master is running at https://abc.superhub.io
```

What just happened? I declared via `hub-configure` that I am willing to deploy my Python applicaiton to the cluster `abc.superhub.io` (it will be different name you). Then SuperHub retrieved a configuration to the file and kubeconfig and stored in the directory: `.hub/env` and created a symlink to point to actual cluster configuration `.hub/current`

Can I change my customize or cluster configuration? The short answer is: YES. More information about how to customize (or extend) my app can be found [here](TBD)

Last but not least. Let's generate applicaiton configuration. Please note you need to regenerate configuration every time when you change your cluster.

```bash
$ make generate
```

More about code generation and conventions can be found [here](TBD) 

## Development with VS Code

We have got our applicaiton configured. Now now it's the IDE turn. For python development we will use vscode with intalled [Google CloudCode](https://cloud.google.com/code/docs/vscode/). Alternative setup for IntelliJ can be found [here](https://cloud.google.com/code/docs/intellij/)

1. Install required plugins

```bash
$ code \
  --install-extension "googlecloudtools.cloudcode" \
  --install-extension "heptio.jsonnet" \
  --install-extension "ms-azuretools.vscode-docker" \
  --install-extension "ms-kubernetes-tools.vscode-kubernetes-tools" \
  --install-extension "ms-python.python" \
  --install-extension "redhat.vscode-yaml" \
  --install-extension "xrc-inc.jsonnet-formatter"
```

2. Open VS Code

```
$ code -n .
```

You might notice that our VSCode has been already properly configured. To use our Kubernetes cluster. 

# First run!


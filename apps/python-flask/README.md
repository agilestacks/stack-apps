# Development Workflow on Kubernetes - Local Development with Skaffold

The goal of this project is to provide automation for developer workflow on Kubernetes. Building applications for Kubernetes enables significant advantages for developers: declarative configuration, automation, portability, scalability, self-healing, etc. However, Kubernetes is still new for many development teams, and building Kubernetes applications requires effective development workflows. This project provides a full implementation of developer workflow and provides examples of how to organize Python development with Kubernetes using Skaffold.

One of the challenges in adopting Kubernetes is answering the following common questions: how do I develop locally, how should I test, and how can I debug? Deploying each code change to a remote Kubernetes cluster forces developers to spend a lot of time waiting, which is bad for developer productivity and happiness. At the same time, local testing is hard because of many dependencies that have to be deployed locally to allow for local testing.  The optimal development workflow will allow us to quickly test and debug local changes of your code in the context of a deployed cloud-based environment, with all dependencies and configurations consistent with other environments. 

By automating the local development workflow, we can significantly reduce the deployment and testing time and provide a quick feedback loop which is always crucial for developer productivity.

You will perform the following steps:
1. [Setup up application](README.md#setup-an-applciation)
2. [Setup VSCode](README.md#development-with-vs-code)
3. [Deploy to Kubernetes cluster](#deploy-my-app)

Depending on your previous experience with Kubernetes and Python, this tutorial should take approximately 25 minutes to complete.

## Motivation

As an application developer I want the ability to debug and develop my code on remote Kubernetes clusters with the same level of productivity as when deploying locally, without having to commit untested changes to Git, and without waiting for deployments.  By automating the local development workflow, we can significantly reduce the deployment and testing phases and provide a quick feedback loop which is always crucial for developer productivity.  At the same time, we need consistency between how code behaves locally and in the cloud-based environment. For example, we need the ability to execute many other services that my code depends on, such as microservices, databases, and messaging systems.  It is often not practical to deploy everything locally due to a lack of RAM, disk, and security context in a local development environment.  This project allows automating deployments to your development environment for development experience very similar to local development. Once the code is ready and committed to Git version control, it can be deployed to other environments (test, stage, prod) via CI/CD pipeline.

Skaffold allows to automate many steps in the developer workflow for Kubernetes:

1. Create Kubernetes configuration files for applications
2. Deploy applications to local or remote Kubernetes clusters
3. Monitor source code for local changes and automatically redeploy when needed
4. Steams logs from deployed pods to your local IDE or terminal

More details about Skaffold are available in the following slide deck [here](TBD)

## Setup an Application

1. To start using Hub CLI binary, download and install using the example for your platform.

On MacOS

```
curl -O https://controlplane.agilestacks.io/dist/hub-cli/hub.darwin_amd64
mv hub.darwin_amd64 hub
chmod +x hub
sudo mv hub /usr/local/bin
```

On Linux

```
curl -O https://controlplane.agilestacks.io/dist/hub-cli/hub.linux_amd64
mv hub.linux_amd64 hub
chmod +x hub
sudo mv hub /usr/local/bin
```


2. Get application source code

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

3. Retrieve SuperHub API Token.

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

The code above will validate that `HUB_TOKEN` environment variable has been defined. Then we will use this toke to fetch the list of currently deployed clusters that provide both: `Kubernetes` cluster and `Harbor` private docker registry. This code also confirms that I do have my prerequisites.

4. Apply cluster configuration

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
$ make -C ".hub" generate
```

Note: jq, yq, jsonnet are required.  On MacOs you can install it with the following command:
```bash 
$ brew install jq yq jsonnet skaffold
```

More about code generation and conventions can be found [here](TBD) 

## Setup Development Environment

We have got our applicaiton configured. The next step is to setup the IDE. For python development we will use VS Code with intalled [Google CloudCode](https://cloud.google.com/code/docs/vscode/). Alternative setup for IntelliJ can be found [here](https://cloud.google.com/code/docs/intellij/)

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


## Setup Kubernetes Cluster
With the local development environment configured, you’re ready to connect to your Kubernetes cluster.  By running Make, you have generated the necessary configuration files for Kubernetes cluster based on the cluster name selected by `hub-configure` command.

Examine the configuration files located in .hub directory:
/python-flask/.hub/env/kubeconfig.cluster_name.superhub.io.yaml
/python-flask/.hub/env/configure
/python-flask/.hub/.vscode/settings.jsonnet
/python-flask/.hub/.vscode/launch.jsonnet


## Start Running and Debugging your App

With the local environment configured, you’re ready to launch your application. Typically, you’d have to perform these tasks: first, build a Docker container and tag it. Second, remember to update your Kubernetes manifests to point to the new container image. Third, go back to the command line to execute kubectl run. As you can imagine, this process is tedious and prone to error.

Once the app launches, every time you make a code change you’ll want to preview it locally before deployment. To do this, you’ll need to repeat the steps above all over again. Fortunately, Skaffold is the tool that automatically generates required Kubernetes manifests.  Skaffold also watches for code changes, and once a change is detected, Skaffold automatically initiates the steps to build, push and deploy the new code to a Kubernetes cluster.

To start Skaffold, use the following command
```
skaffold dev -p incluster
```

You should be able to see the following output:
```
Listing files to watch...
 - rubik
Generating tags...
 - rubik -> ml1-harbor.svc.ml1.demo51.superhub.io/library/rubik:20200212-155028
Checking cache...
 - rubik: Not found. Building
Creating docker config secret [docker-cfg]...
Building [rubik]...
...
Tags used in deployment:
 - rubik -> ml1-harbor.svc.ml1.demo51.superhub.io/library/rubik:20200212-155028@sha256:c088e117c4b81d160dd3444ef1c28a6d93849f514b7a814a0dce8dd80b567193
Starting deploy...
 - deployment.apps/rubik created
 - ingress.extensions/rubik created
 - secret/rubik-dockerconfig created
 - service/rubik created
Watching for changes...
[rubik-d54d9f4bc-cddnb applicaiton]  * Serving Flask app "app.py"
[rubik-d54d9f4bc-cddnb applicaiton]  * Environment: docker
[rubik-d54d9f4bc-cddnb applicaiton]  * Debug mode: on
[rubik-d54d9f4bc-cddnb applicaiton]  * Running on http://0.0.0.0:80/ (Press CTRL+C to quit)
```

You can access the application using the following URL:
```
https://rubik.app.stack_name.account_name.superhub.io
```



tool that can bring more control and efficiency to this clunky process.



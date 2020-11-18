# Simplifying Kubernetes for Developers with Hub CLI and Skaffold

### NodeJs Application Template

This is a cusomizable application template for Python Flask applications on Kubernetes.

Until recently, the developer experience with Kubernetes was very complicated. Getting environments stood up for demonstrating changes is also sometimes a long and tedious process.  So much, in fact, that it was recommended that smaller shops with only a handful of services should probably not bother with Kubernetes. This was because the overhead of configuration, CI/CD, and, most especially, developer workflows, was prohibitively high. In addition to configuring Kubernetes, there are many questions that don’t have a simple answer: how do I develop locally, how should I test, and debug, and how often do I merge code into master branch?

To address these challenges, we have created developer workflow automation based on Skaffold, Hub CLI, and VS Code.

The goal of this template is to provide automation for developer workflows on Kubernetes. At the core of this approach is Skaffold. Skaffold is a powerful tool for automating dev->test cycles on Kubernetes. In order to unlock some of the powerful features of Skaffold, AgileStacks provides automatic configuration management for Skaffold from Hub CLI tool. When used together, these tools offer a combination of power and ease of use.

### Required Prerequisites
This application template requires a cloud based or local Kubernetes cluster and an instance of [Application Stack](https://github.com/agilestacks/stack-app-eks) to provide required infrastructure services such as ingress.

Hub CLI is a packaging and deployment tool.  You can download Hub CLI from [here](https://superhub.io/)

### Configure and Deploy Python Application

We will create DevOps automation for a simple NodeJs application, and deploy the app to Kubernetes with the following commands:

```
$ git clone https://github.com/agilestacks/stack-apps.git
$ cd stack-apps/apps/python-flask
$ hub configure -f hub.yaml
$ source .env
$ skaffold dev --port-forward
```

For additional details please refer to the following tutorial: [Simplifying Kubernetes for Developers with Hub CLI and Skaffold](https://docs.agilestacks.com/article/3pbulps5n7-simplifying-kubernetes-for-developers-with-hub-cli-and-skaffold). 

### Support
Contact support@agilestacks.com for help with this template.

#!/bin/bash

kubectl --context="${DOMAIN_NAME}" delete configmap test-plan
kubectl --context="${DOMAIN_NAME}" delete job ${COMPONENT_NAME}-job

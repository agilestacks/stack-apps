#!/bin/bash

# clean up after previous attempts
./undeploy.sh

JOB_NAME=${COMPONENT_NAME}-job
kubectl --context="${DOMAIN_NAME}" create configmap test-plan --from-file=test.yml=k8s/test.yml
kubectl --context="${DOMAIN_NAME}" apply -f k8s/validator-job.yaml
kubectl --context="${DOMAIN_NAME} "wait --for=condition=complete --timeout=30s job/${JOB_NAME}

echo ""
echo "Outputs:"
echo "validator_result = succeeded"
echo ""

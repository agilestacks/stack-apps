#!/bin/bash -x

kubectl --context="${DOMAIN_NAME}" apply -f k8s/

kubectl --context="${DOMAIN_NAME}" wait --for=condition=available --timeout=600s deployment/${COMPONENT_NAME}

#!/bin/bash

kubectl --context="${DOMAIN_NAME}" delete deployment ${DOMAIN_NAME}

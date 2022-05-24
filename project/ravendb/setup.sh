#!/bin/bash

echo "Applying license to raven1"
curl 'http://localhost:8080/admin/license/activate' -H 'Content-Type: application/json; charset=UTF-8' --data-binary @license.json --compressed

echo "Adding raven2 to the cluster..."
curl 'http://localhost:8080/admin/cluster/node?url=http%3A%2F%2Fraven2%3A8080&watcher=true' -X 'PUT' --compressed

echo "Adding raven3 to the cluster..."
curl 'http://localhost:8080/admin/cluster/node?url=http%3A%2F%2Fraven3%3A8080&watcher=true' -X 'PUT' --compressed

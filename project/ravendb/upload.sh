#!/bin/bash

echo "Creating database..."

curl -s 'http://localhost:8080/admin/databases?name=nolx&replicationFactor=1' \
  -X 'PUT' \
  --data-raw '{"DatabaseName":"nolx","Settings":{},"Disabled":false,"Encrypted":false,"Topology":{"DynamicNodesDistribution":false}}' \
  --compressed > /dev/null

echo "Creating indexes..."

curl -s 'http://localhost:8080/databases/nolx/admin/indexes' \
  -X 'PUT' \
  --data-raw '{"Indexes":[{"Name":"purchasesByUsername","Maps":["from purchase in docs.Purchases\r\nselect new {\r\n    username = LoadDocument(purchase.client, \"Clients\").username,\r\n    purchase.orderDate\r\n}"],"Type":"Map","SourceType":"Documents","LockMode":"Unlock","Priority":"Normal","DeploymentMode":null,"Configuration":{},"Fields":{},"OutputReduceToCollection":null,"PatternForOutputReduceToCollectionReferences":null,"PatternReferencesCollectionName":null,"AdditionalSources":null,"AdditionalAssemblies":[]}]}' \
  --compressed > /dev/null

curl -s 'http://localhost:8080/databases/nolx/admin/indexes' \
  -X 'PUT' \
  --data-raw '{"Indexes":[{"Name":"purchasesLinesByStore","Maps":["from purchase in docs.Purchases\r\nfrom line in purchase.lines\r\nselect new { \r\n    line.store,\r\n    lines = new [] { new { line.productId, line.productName, line.price, line.unitPrice, line.quantity, line.store } },\r\n    purchase.Id,\r\n    total = line.price,\r\n    purchase.orderDate\r\n}"],"Reduce":"from r in results\r\ngroup r by new { r.Id, r.store, r.orderDate } into g\r\nselect new {\r\n    store = g.Key.store,\r\n    Id = g.Key.Id,\r\n    orderDate = g.Key.orderDate,\r\n    lines = g.SelectMany(x => x.lines),\r\n    total = g.Sum(x => x.total)\r\n}","Type":"MapReduce","SourceType":"Documents","LockMode":"Unlock","Priority":"Normal","DeploymentMode":null,"Configuration":{},"Fields":{"__all_fields":{"Analyzer":null,"Indexing":null,"Storage":"Yes","Suggestions":null,"TermVector":null}},"OutputReduceToCollection":null,"PatternForOutputReduceToCollectionReferences":null,"PatternReferencesCollectionName":null,"AdditionalSources":null,"AdditionalAssemblies":[]}]}' \
  --compressed > /dev/null

echo "Uploading data..."

cd upload
python upload_products.py
python upload_clients.py
python upload_purchases.py
cd ..

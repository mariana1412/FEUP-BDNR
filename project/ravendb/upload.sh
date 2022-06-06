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

curl -s 'http://localhost:8080/databases/nolx/indexes' \
  -X 'PUT' \
  --data-raw '{"Indexes":[{"Name":"products/search","Maps":["map(\"Products\", (product) => {\r\n    return {\r\n        exactName: product.name,\r\n        name: product.name,\r\n        description: product.description,\r\n        stock: product.stock,\r\n        store: product.store,\r\n        category: product.category,\r\n        rating: product.rating,\r\n        price: product.price\r\n    };\r\n})"],"Reduce":null,"Type":"Map","SourceType":"Documents","LockMode":"Unlock","Priority":"Normal","DeploymentMode":null,"Configuration":{},"Fields":{"description":{"Analyzer":null,"Indexing":"Search","Storage":"Yes","Suggestions":null,"TermVector":"WithPositionsAndOffsets"},"name":{"Analyzer":null,"Indexing":"Search","Storage":null,"Suggestions":null,"TermVector":null},"exactName":{"Analyzer":null,"Indexing":"Exact","Storage":null,"Suggestions":null,"TermVector":null}},"OutputReduceToCollection":null,"PatternForOutputReduceToCollectionReferences":null,"PatternReferencesCollectionName":null,"AdditionalSources":null,"AdditionalAssemblies":[]}]}' \
  --compressed > /dev/null

curl 'http://localhost:8080/databases/nolx/indexes' \
  -X 'PUT' \
  --data-raw '{"Indexes":[{"Name":"products/morelikethis","Maps":["map(\"Products\", (product) => {\r\n    return {\r\n        category: product.category\r\n    };\r\n})"],"Type":"Map","SourceType":"Documents","LockMode":"Unlock","Priority":"Normal","DeploymentMode":null,"Configuration":{},"Fields":{"category":{"Analyzer":null,"Indexing":null,"Storage":"Yes","Suggestions":null,"TermVector":"WithPositionsAndOffsets"}},"OutputReduceToCollection":null,"PatternForOutputReduceToCollectionReferences":null,"PatternReferencesCollectionName":null,"AdditionalSources":null,"AdditionalAssemblies":[]}]}' \
  --compressed > /dev/null

curl 'http://localhost:8080/databases/nolx/indexes' \
  -X 'PUT' \
  --data-raw '{"Indexes":[{"Name":"clients/suggest","Maps":["map(\"Clients\", (client) => {\r\n    return {\r\n        username: client.username,\r\n    };\r\n\r\n})"],"Type":"Map","SourceType":"Documents","LockMode":"Unlock","Priority":"Normal","DeploymentMode":null,"Configuration":{},"Fields":{"username":{"Analyzer":null,"Indexing":"Search","Storage":null,"Suggestions":true,"TermVector":null}},"OutputReduceToCollection":null,"PatternForOutputReduceToCollectionReferences":null,"PatternReferencesCollectionName":null,"AdditionalSources":null,"AdditionalAssemblies":[]}]}' \
  --compressed > /dev/null

echo "Uploading data..."

cd upload
echo 'Sending products...'
python upload_products.py
echo 'Sending clients...'
python upload_clients.py
echo 'Sending purchases...'
python upload_purchases.py
cd ..

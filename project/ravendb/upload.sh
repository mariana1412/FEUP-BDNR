#!/bin/bash

curl -s 'http://localhost:8080/databases/nolx/indexes' \
  -X 'PUT' \
  --data-raw '{"Indexes":[{"Name":"products/search","Maps":["map(\"Products\", (product) => {\r\n    return {\r\n        exactName: product.name,\r\n        name: product.name,\r\n        description: product.description,\r\n        stock: product.stock,\r\n        store: product.store,\r\n        category: product.category,\r\n        rating: product.rating,\r\n        price: product.price\r\n    };\r\n})"],"Reduce":null,"Type":"Map","SourceType":"Documents","LockMode":"Unlock","Priority":"Normal","DeploymentMode":null,"Configuration":{},"Fields":{"description":{"Analyzer":null,"Indexing":"Search","Storage":"Yes","Suggestions":null,"TermVector":"WithPositionsAndOffsets"},"name":{"Analyzer":null,"Indexing":"Search","Storage":null,"Suggestions":null,"TermVector":null},"exactName":{"Analyzer":null,"Indexing":"Exact","Storage":null,"Suggestions":null,"TermVector":null}},"OutputReduceToCollection":null,"PatternForOutputReduceToCollectionReferences":null,"PatternReferencesCollectionName":null,"AdditionalSources":null,"AdditionalAssemblies":[]}]}' \
  --compressed > /dev/null

cd upload
python upload_products.py
python upload_clients.py
python upload_purchases.py
cd ..
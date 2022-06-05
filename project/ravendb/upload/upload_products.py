import os
import json
import requests
from sympy import re

def put(object):
    object["@metadata"] = {
        "@collection": "Products"
    }
    
    id = object.pop('Id', None)
    object.pop("stock")

    return {
        "Id": id,
        "Document": object, 
        "Type": "PUT"
    }

def counter(object):
    return {
        "DocumentId": object["Id"],
        "Operations": [{"Type":"Increment","CounterName":"stock","Delta":object["stock"]}]
    }

commands = {"Commands":[]}
documents = {"Documents": []}

for file in os.scandir("../json/products"):
    if file.is_file():
        with open(file.path) as f:
            products = json.load(f)
            for product in products:
                documents["Documents"].append(counter(product))
                commands["Commands"].append(put(product))
                


req = requests.post("http://localhost:8080/databases/nolx/bulk_docs", json=commands)
print(req.status_code)
if req.status_code != 201:
    print(req.text)

req = requests.post("http://localhost:8080/databases/nolx/counters", json=documents)
print(req.status_code)
if req.status_code != 200:
    print(req.text)
import os
import json
import requests

def put(object):
    object["@metadata"] = {
        "@collection": "Products"
    }
    
    id = object.pop('Id', None)

    return {
        "Id": id,
        "Document": object, 
        "Type": "PUT"
    }

commands = {"Commands":[]}

for file in os.scandir("../json/products"):
    if file.is_file():
        with open(file.path) as f:
            products = json.load(f)
            for product in products:
                commands["Commands"].append(put(product))


req = requests.post("http://localhost:8080/databases/nolx/bulk_docs", json=commands)
print(req.status_code)
if req.status_code != 201:
    print(req.text)
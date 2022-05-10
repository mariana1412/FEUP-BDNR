import os
import json
import requests

def put(product):
    return {"Document": product, "Type": "PUT"}

commands = {"Commands":[]}

for file in os.scandir("../json/products"):
    if file.is_file():
        with open(file.path) as f:
            products = json.load(f)
            for product in products:
                product["@metadata"] = {"@collection":product["store"]}
                product.pop("store")
                commands["Commands"].append(put(product))


req = requests.post("http://localhost:8080/databases/products/bulk_docs", json=commands)
print(req.status_code)
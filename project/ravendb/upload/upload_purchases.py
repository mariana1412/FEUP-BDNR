import json
import requests

def put(product):
    return {"Document": product, "Type": "PUT"}

commands = {"Commands":[]}

with open("../json/purchases.json") as f:
    purchases = json.load(f)
    commands["Commands"] = [put(purchase) for purchase in purchases]

req = requests.post("http://localhost:8080/databases/purchases/bulk_docs", json=commands)
print(req.status_code)
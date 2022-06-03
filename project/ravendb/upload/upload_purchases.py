import json
import requests

def put(object):
    object["@metadata"] = {
        "@collection": "Purchases"
    }
    
    id = object.pop('Id', None)

    return {
        "Id": id,
        "Document": object, 
        "Type": "PUT"
    }

commands = {"Commands":[]}

with open("../json/purchases.json") as f:
    purchases = json.load(f)
    commands["Commands"] = [put(purchase) for purchase in purchases]

req = requests.post("http://localhost:8080/databases/nolx/bulk_docs", json=commands)
print(req.status_code)
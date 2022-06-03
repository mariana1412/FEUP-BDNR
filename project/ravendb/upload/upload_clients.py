import json
import requests

def put(object):
    object["@metadata"] = {
        "@collection": "Clients"
    }
    
    id = object.pop('Id', None)

    return {
        "Id": id,
        "Document": object, 
        "Type": "PUT"
    }

commands = {"Commands":[]}

with open("../json/clients.json") as f:
    clients = json.load(f)
    commands["Commands"] = [put(client) for client in clients]

req = requests.post("http://localhost:8080/databases/nolx/bulk_docs", json=commands)
print(req.status_code)
if req.status_code != 201:
    print(req.text)
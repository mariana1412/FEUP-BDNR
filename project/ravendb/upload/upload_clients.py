import json
import requests

def put(product):
    return {"Document": product, "Type": "PUT"}

commands = {"Commands":[]}

with open("../json/clients.json") as f:
    clients = json.load(f)
    commands["Commands"] = [put(client) for client in clients]

req = requests.post("http://localhost:8080/databases/clients/bulk_docs", json=commands)
print(req.status_code)
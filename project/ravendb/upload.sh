#!/bin/bash

cd upload
python upload_products.py
python upload_clients.py
python upload_purchases.py
cd ..
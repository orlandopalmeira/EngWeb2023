# Programa python que pede à API de dados para inserir os dados do ficheiro json,
import json
from requests import post

file = open('dataset-extra1.json')
db = json.load(file)['pessoas']
file.close()

url = 'http://localhost:7777/pessoas'

for pessoa in db:
    resp = post(url,json=pessoa)
    if resp.status_code != 200:
        print(f"Código {resp.status_code} Erro a enviar {pessoa['_id']}:{pessoa['nome']}")

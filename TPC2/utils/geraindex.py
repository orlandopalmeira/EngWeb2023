import json
from itertools import groupby
from cidade import Cidade

############################### Processamento dos dados ###############################

f = open('./data/mapa.json') # abre em modo de leitura por omissão
data = json.load(f) # processa o ficheiro json

# obtem as cidades e as ligações
cidades = data['cidades'] 
ligacoes = data['ligações']

# Cria as cidades e calcula todas as suas ligações
db_ = [] # cidades com as ligações
for c in cidades:
    city = Cidade.jsonToCidade(c)
    city.addLigacoes(ligacoes,cidades)
    db_.append(city)

db = dict() # dicionario com o formato {'distrito': [cidades do distrito]}

for distrito, cidade in groupby(db_, lambda x: x.distrito):
    if distrito in db: db[distrito] += list(cidade)
    else: db[distrito] = list(cidade)

db = dict(sorted(db.items())) # dicionário ordenado pelos distritos
for distrito in db: # ordena as listas das cidades de cada distrito
    db[distrito].sort(key=lambda x: x.nome)

############################### Criação do index.html ###############################

pagHTML = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Mapa virtual</title>
</head>
<body>
    <h1>Mapa virtual</h1>'''

for distrito in db:
    pagHTML += f'''
    <strong>{distrito}</strong>
    <ul>'''
    for cidade in db[distrito]:
        pagHTML += f'''
        <li><a href="http://localhost:7777/{cidade.id}">{cidade.nome}</a></li>'''
    pagHTML += '\n    </ul>'

pagHTML += '''
</body>
</html>
'''

print(pagHTML, end='')

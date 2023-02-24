import json
from cidade import Cidade

############################### Processamento dos dados ###############################

f = open('./data/mapa.json') # abre em modo de leitura por omissão
data = json.load(f) # processa o ficheiro json

# obtem as cidades e as ligações
cidades = data['cidades'] 
ligacoes = data['ligações']

# Cria as cidades e calcula todas as suas ligações
db = [] # cidades com as ligações
for c in cidades:
    city = Cidade.jsonToCidade(c)
    city.addLigacoes(ligacoes,cidades)
    db.append(city)

# Esta função cria o ficheiro html de uma certa cidade
def geraCXHTML(cidade: Cidade):
    cx = open(f'./pages/{cidade.id}.html','w')
    pagHTML = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{cidade.nome}</title>
</head>
<body>
    <h1>{cidade.nome}</h1>
    <p><b>Distrito:</b> {cidade.distrito}</p>
    <p><b>População:</b> {cidade.populacao}</p>
    <p><b>Descrição:</b> {cidade.descricao}</p>
    <p><b>Ligações:</b></p>
    <table>
        <thead>
            <tr>
                <th style="text-align: left">Destino</th>
                <th style="text-align: left">Distância</th>
            </tr>
        </thead>
        <tbody>'''
    for ligacao in cidade.ligacoes:
        pagHTML += f'''
        <tr>
            <td><a href="http://localhost:7777/{ligacao['id_dest']}">{ligacao['destino']}</a></td>
            <td>{ligacao['distância']}</td>
        </tr>
        '''
    pagHTML += '''
    </tbody>
    </table>
    <a href="http://localhost:7777/">Voltar ao índice</a>
</body>
</html>'''
    cx.write(pagHTML)
    cx.close()

############################### Criação das páginas das cidades ###############################

for cidade in db:
    geraCXHTML(cidade)
import json
from cidade import Cidade

f = open('mapa.json') # abre em modo de leitura por omissão
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

db.sort(key=lambda x: x.nome)

pagHTML = '''<!DOCTYPE html>
<html lang="en">
<head>
    <title>Mapa Virtual</title>
    <meta charset="UTF-8">
</head>
<body>
    <h1>Mapa Virtual</h1>
    <table>
        <tr>
            <!--Coluna do índice-->
            <td width="30%" style="vertical-align: top">
                <a name="indice"></a>
                <h3>Índice</h3>
                <ol>
'''

for c in db:
    pagHTML += f'<li><a href="#{c.id}">{c.nome}</a></li>'

pagHTML += '''
                </ol>
            </td>
            <!--Coluna do conteúdo-->
            <td width="70%">
'''

for c in db:
    pagHTML += f'''
                <a name="{c.id}"></a>
                <h3>{c.nome}</h3>
                <p><b>Distrito:</b> {c.distrito}</p>
                <p><b>População:</b> {c.populacao}</p>
                <p><b>Descrição:</b> {c.descricao}</p>
                <p><b>Ligações</b></p>
                <table>
                    <thead>
                        <tr>
                            <th style="text-align: left">Destino</th>
                            <th style="text-align: left">Distância</th>
                        </tr>
                    </thead>
                    <tbody>'''
    for lig in c.ligacoes:
        pagHTML += f'''
            <tr>
                <td><a href="#{lig['id_dest']}">{lig['destino']}</a></td>
                <td>{lig['distância']}</td>
            </tr>
        '''
    pagHTML += '''
                    </tbody>
                </table>
                <a href="#indice">Voltar ao índice</a>
                <div style="text-align: center">
                    <hr width="100%">
                </div>
    '''

pagHTML += '''
            </td>
        </tr>
    </table>
</body>
</html>
'''

page = open('mapa.html','w')
page.write(pagHTML)
page.close()

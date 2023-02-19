class Cidade:

    def __init__(self, id: str, nome: str, populacao: int, descricao: str, distrito: str):
        self.id = id
        self.nome = nome
        self.populacao = populacao
        self.descricao = descricao
        self.distrito = distrito
        self.ligacoes = []

    def __str__(self):
        return self.nome
    
    def __repr__(self):
        return str(self)

    @staticmethod
    def jsonToCidade(jSON: dict):
        return Cidade(jSON['id'], jSON['nome'], jSON['população'], jSON['descrição'], jSON['distrito'])

    def addLigacoes(self, ligacoes: list, cidades: list):
        ligacoes_ = list(filter(lambda x: x['origem'] == self.id, ligacoes)) # vai buscar as ligações desta cidade

        def aux(ligacao: dict): # função que retorna uma ligação com dados legíveis e não apenas id's
            (id_dest,dest) = [(c['id'], c['nome']) for c in cidades if ligacao['destino'] == c['id']][0]
            return {'id': ligacao['id'], 'id_dest': id_dest, 'destino': dest, 'distância': ligacao['distância']}

        ligacoes_ = list(map(aux, ligacoes_))
        self.ligacoes += ligacoes_
        
    
    
const Pessoa = require('../models/pessoa')

module.exports.list = () => { // funciona
    return Pessoa.find().sort({nome:1})
    .then(dados => {
        return dados
    })
    .catch(erro => {
        return erro
    })
}

module.exports.count = () => { 
    return Pessoa.find()
    .then(dados => {
        return {count: dados.length}
    })
    .catch(erro => {
        return erro
    })
}

module.exports.getPessoa = id => { // funciona
    return Pessoa.findOne({_id: id})
           .then((dados) => {
                return dados
           }).catch((erro) => {
                return erro
           });
}

module.exports.addPessoa = p => { // funciona
    return Pessoa.create(p)
            .then((dados) => {
                return dados
            }).catch((erro) => {
                return erro
            });
}

module.exports.updatePessoa = p => { // funciona
    return Pessoa.updateOne({_id: p._id}, p)
            .then((dados) => {
                return dados
            }).catch((erro) => {
                return erro
            });
}

module.exports.deletePessoa = id => { // funciona
    return Pessoa.deleteOne({_id: id})
        .then((dados) => {
            return dados
        }).catch((erro) => {
            return erro
        });
}
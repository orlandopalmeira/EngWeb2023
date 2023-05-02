var Exame = require('../models/exame')

// "id", "nome", "data" e "resultado"
module.exports.list = () => {
    return Exame
        .find({}, { _id: 1, nome: 1, data: 1, resultado: 1 })
        .sort({ data: -1 })
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.getExame = id => {
    return Exame.findOne({ _id: id })
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.addExame = l => {
    return Exame.create(l)
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.updateExame = l => {
    return Exame.updateOne({ _id: l._id }, l)
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.deleteExame = id => {
    return Exame.deleteOne({ _id: id })
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.modalidades = () => {
    return Exame.aggregate([
        {
            $group: {
                _id: "$modalidade"
            }
        }
    ]).then(resposta => {
        return resposta
    })
    .catch(erro => {
        return erro
    })
}

module.exports.resOK = () => {
    return Exame.find({resultado: true})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.listByModalidade = (modalidade_) => {
    return Exame.find({ modalidade: modalidade_ })
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.listGenF = () => {
    return Exame.find({ "género": "F" },{_id: 0, nome: 1}).sort({'nome': 1})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.listAthletesByClub = (club) => {
    return Exame.find({ clube: club},{_id: 0, nome: 1}).sort({'nome': 1})
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}



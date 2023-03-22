var express = require('express');
var router = express.Router();
const Pessoa = require('../controllers/pessoa');


router.get('/pessoas', function(req, res, next) { // funciona
    Pessoa.list()
    .then((dados) => {
        res.json(dados)
    }).catch((erro) => {
        res.json({error: erro})
    });
});

router.get('/pessoas/count', function(req, res, next) { // funciona
    Pessoa.count()
    .then((dados) => {
        res.json(dados)
    }).catch((erro) => {
        res.json({error: erro})
    });
});

router.get('/pessoas/:id', function(req, res, next) { // funciona
    Pessoa.getPessoa(req.params.id)
    .then((dados) => {
        res.json(dados)
    }).catch((erro) => {
        res.json({error: erro})
    });
});

router.post('/pessoas', function(req, res, next) { // funciona
    Pessoa.addPessoa(req.body)
    .then((dados) => {
        res.json(dados)
    }).catch((erro) => {
        res.json({error: erro})
    });
});

router.put('/pessoas/:id', function(req, res, next) { // funciona
    Pessoa.updatePessoa(req.body)
    .then((dados) => {
        res.json(dados)
    }).catch((erro) => {
        res.json({error: erro})
    });
});

router.delete('/pessoas/:id', function(req, res, next) { // funciona
    Pessoa.deletePessoa(req.params.id)
    .then((dados) => {
        res.json(dados)
    }).catch((erro) => {
        res.json({error: erro})
    });
});

module.exports = router;
